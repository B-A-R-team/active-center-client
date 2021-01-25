/*
 * @Author: lts
 * @Date: 2021-01-25 08:54:02
 * @LastEditTime: 2021-01-25 09:09:26
 * @FilePath: \active-center-client\src\api\index.js
 */
/*
 * @Author: Mengyu Xu
 * @Date: 2020-12-30 13:59:30
 * @LastEditTime: 2020-12-30 15:48:50
 * @FilePath: \admin\src\api\index.js
 */

import axios from 'axios';
import warnning from '../utils/warnning';

axios.defaults.baseURL = 'https://www.barteam.cn:2992/api/v1/'

axios.interceptors.request.use(
  (config) => {
    const token = window.sessionStorage.getItem('token') || '';
    if (token !== '') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use( (response) => {
    const { data: result } = response;

    if (result.code !== 200) {
      warnning('错误', result.message);
    }

    return result;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;

