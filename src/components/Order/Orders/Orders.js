import React, { Component } from 'react';
import Order from '../Order/Order';
import WithErrorHandler from '../../../shared/WithErrorHandler/WithErrorHandler';

import axios from '../../../shared/axios-orders';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get('/orders.json')
      .then(response => {
        const fetchedOrders = [];
        Object.keys(response.data).forEach(key =>
          fetchedOrders.push({ ...response.data[key], id: key })
        );
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>
    );
  }
}

export default WithErrorHandler(Orders, axios);
