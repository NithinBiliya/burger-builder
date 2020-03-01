import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-5ca1e.firebaseio.com/'
});

console.log('creating orders axios instance');

export default instance;
