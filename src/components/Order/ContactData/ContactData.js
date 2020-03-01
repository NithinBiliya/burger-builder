import React, { Component } from 'react';
import Button from '../../../shared/Button/Button';
import Spinner from '../../../shared/Spinner/Spinner';
import Input from '../../../shared/Input/Input';

import axios from '../../../shared/axios-orders';
import classes from './ContactData.module.css';

const createElementConfig = function(
  elementType,
  elementConfig,
  value,
  valid,
  validation,
  touched
) {
  return {
    elementType: elementType,
    elementConfig: elementConfig,
    value: value,
    valid: valid ? valid : false,
    validation: validation ? validation : null,
    touched: touched ? touched : false
  };
};

class ContactData extends Component {
  state = {
    orderForm: {
      name: createElementConfig(
        'input',
        {
          type: 'text',
          placeholder: 'Your name',
          name: 'name'
        },
        '',
        false,
        {
          required: true
        }
      ),
      email: createElementConfig(
        'input',
        {
          type: 'email',
          placeholder: 'Your email',
          name: 'email'
        },
        '',
        false,
        {
          required: true
        }
      ),
      street: createElementConfig(
        'input',
        {
          type: 'text',
          placeholder: 'Street',
          name: 'street'
        },
        '',
        false,
        {
          required: true
        }
      ),
      zipCode: createElementConfig(
        'input',
        {
          type: 'text',
          placeholder: 'ZIP code',
          name: 'zipCode'
        },
        '',
        false,
        {
          required: true,
          minLength: 5,
          maxLength: 5
        }
      ),
      country: createElementConfig(
        'input',
        {
          type: 'text',
          placeholder: 'Country',
          name: 'country'
        },
        '',
        false,
        {
          required: true
        }
      ),
      deliveryMethod: createElementConfig(
        'select',
        {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ],
          name: 'deliveryMethod'
        },
        'fastest',
        true
      )
    },
    isFormValid: false,
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    const customerData = {};
    for (let key in this.state.orderForm) {
      customerData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customerData: customerData
    };

    this.setState({ loading: true });
    axios
      .post('/orders.json', order)
      .then(response => {
        console.log('response - ', response);
        this.setState({ loading: false });
        this.props.history.replace('/');
      })
      .catch(error => {
        console.log('error - ', error);
        this.setState({ loading: false });
      });
  };

  checkValidity = (value, validation) => {
    if (!validation) {
      return true;
    }
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (validation.minLength) {
      isValid = value.length <= validation.minLength && isValid;
    }
    if (validation.maxLength) {
      isValid = value.length >= validation.maxLength && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event, key, inputConfig) => {
    const newOrderForm = { ...this.state.orderForm };
    newOrderForm[key] = { ...inputConfig };
    newOrderForm[key].value = event.target.value;
    newOrderForm[key].valid = this.checkValidity(
      newOrderForm[key].value,
      newOrderForm[key].validation
    );
    newOrderForm[key].touched = true;

    let isFormValid = true;
    for (let k in newOrderForm) {
      isFormValid = newOrderForm[k].valid && isFormValid;
    }
    this.setState({ orderForm: newOrderForm, isFormValid: isFormValid });
  };

  render() {
    const formElements = Object.keys(this.state.orderForm).map(key => (
      <Input
        key={key}
        className={classes.input}
        elementType={this.state.orderForm[key].elementType}
        elementConfig={this.state.orderForm[key].elementConfig}
        value={this.state.orderForm[key].value}
        changed={event =>
          this.inputChangedHandler(event, key, this.state.orderForm[key])
        }
        invalid={!this.state.orderForm[key].valid}
        shouldValidate={this.state.orderForm[key].validation}
        touched={this.state.orderForm[key].touched}
      />
    ));
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements}
        <Button btnType="Success" disabled={!this.state.isFormValid}>
          CONTINUE
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes['contact-data']}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
