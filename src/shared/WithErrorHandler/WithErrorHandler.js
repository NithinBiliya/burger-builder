import React, { Component } from 'react';
import Modal from '../Modal/Modal';

const WithErrorHandler = function(WrapperComponent, axios) {
  return class extends Component {
    state = {
      error: null
    };

    constructor() {
      super();
      this.requestInterceptor = axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      });

      this.responseInterceptor = axios.interceptors.response.use(
        response => response,
        error => {
          this.setState({ error: error });
          // Promise.reject(error);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal show={this.state.error} modalClosed={this.errorConfirmHandler}>
            {this.state.error ? this.state.error.message : 'adasdadasdasdas'}
          </Modal>
          <WrapperComponent {...this.props} />
        </>
      );
    }
  };
};

export default WithErrorHandler;
