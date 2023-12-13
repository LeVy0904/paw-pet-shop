import axios from 'axios';
import Cookies from 'js-cookie';

axios.interceptors.request.use(
  config => {
    const token = Cookies.get('token'); 
    if (token) {
      config.headers.Authorization =token ; 
      console.log(config.headers.Authorization)
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
export default axios