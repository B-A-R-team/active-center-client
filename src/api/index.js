/*
 * @Author: lts
 * @Date: 2021-01-25 08:54:02
 * @LastEditTime: 2021-01-31 10:03:11
 * @FilePath: \active-center-client\src\api\index.js
 */
/*
 * @Author: Mengyu Xu
 * @Date: 2020-12-30 13:59:30
 * @LastEditTime: 2020-12-30 15:48:50
 * @FilePath: \admin\src\api\index.js
 */

import axios from 'axios';
import warnning,{ErrorNotification} from '../utils/warnning';

axios.defaults.baseURL = 'http://www.barteam.cn:2048/api/'

axios.interceptors.request.use(
  (config) => {
    const time_key = window.localStorage.getItem('time_key')
    // console.log(time_key)
    let myDate = new Date().getTime()
    if(myDate >= parseInt(time_key)) {
      window.localStorage.clear()
      ErrorNotification('警告','登录过期，请重新登录')
      window.location.href = '/login'
    }
    const token = window.localStorage.getItem('token') || '';
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

