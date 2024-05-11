import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
// import { MessageBox, Message } from 'element-ui';
// import store from '@/store';
// import router from '@/router';
// import { getToken } from '@/utils/auth';

// create an axios instance
const service = axios.create({
  baseURL: process.env.BACKEND_BASE_API as string, // url = base url + request url
  // baseURL: 'http://localhost:8000/api',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 300000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // do something before request is sent
    // if (store.getters.token) {
    //     // 非简单请求不要带这个
    //     config.headers['X-Token'] = getToken()
    // }
    // config.headers['Access-Control-Allow-Origin'] = '*'
    // 这里可以打印一下检查请求内容
    // console.log('request: ' + config)
    return config;
  },
  (error: AxiosError) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    // if the custom status is not 200, it is judged as an error.
    if (response.status !== 200 && response.status !== 204) {
      // Message({
      //     message: response.statusText || 'Error',
      //     type: 'error',
      //     duration: 5 * 1000
      // });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        response.status === 508 ||
        response.status === 512 ||
        response.status === 514
      ) {
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //     confirmButtonText: 'Re-Login',
        //     cancelButtonText: 'Cancel',
        //     type: 'warning'
        // }).then(() => {
        //     store.dispatch('user/resetToken').then(() => {
        //         location.reload();
        //     });
        // });
      }
      return Promise.reject(new Error(response.statusText || "Error"));
    } else {
      return res;
    }
  },
  (error: AxiosError) => {
    console.log("err " + error); // for debug
    if (error.response && error.response.status === 401) {
      // MessageBox.confirm('登录超时，请重新登陆', '会话超时', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      // }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //         router.push('/login');
      //     });
      // });
    }
    // Message({
    //     message: error.response?.data.message,
    //     type: 'error',
    //     duration: 5 * 1000
    // });
    return Promise.reject(error);
  },
);

export default service;
