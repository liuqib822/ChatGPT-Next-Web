import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { message } from "antd";

// create an axios instance
const service = axios.create({
  baseURL: "https://www.data-insight.com/api",
  // baseURL: "http://localhost:8000/api",
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 300000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers["Access-Control-Allow-Origin"] = "*";
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
      // 弹出通知
      message.error("登录超时，请重新登录");

      // 重定向到登录页面
      (window.top as Window).location.href =
        "https://www.data-insight.com/data-platform/#/login";
    }
    message.error(error.response?.data.message);
    // Message({
    //     message: error.response?.data.message,
    //     type: 'error',
    //     duration: 5 * 1000
    // });
    return Promise.reject(error);
  },
);

export default service;
