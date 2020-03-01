import React from 'react';
import classes from './Input.module.css';

const Input = function(props) {
  const inputClasses = [classes['input-element']];
  let validationErrorElement = null;
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.invalid);
    validationErrorElement = (
      <p className={classes['validation-error']}>
        {props.message ? props.message : 'Please enter a valid value!'}
      </p>
    );
  }

  let inputElement = null;
  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          {...props.elementConfig}
          className={inputClasses.join(' ')}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          {...props.elementConfig}
          className={inputClasses.join(' ')}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          name={props.elementConfig.name}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          className={inputClasses.join(' ')}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.input}>
      <label className={classes['label']}>{props.label}</label>
      {inputElement}
      {validationErrorElement}
    </div>
  );
};

export default Input;
