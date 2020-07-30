import {AxiosRequestConfig} from 'axios';
import {axiosInstance, useAuthentication, formUrl, headers} from './httpUtil';

/**
 * axios get Request
 * @param url
 * @param config
 * @constructor
 */
function Get(url: string, config?: AxiosRequestConfig) {
  const fullUrl = formUrl(url);
  config = {headers: headers(config, url), ...config};
  return axiosInstance.get(fullUrl, config).then(
    response => {
      return response.data;
    },
    error => {
      console.log(error.message);
      console.log(error.config);
      throw error.config;
    }
  );
}

/**
 * axios get Request with Authentication
 * @param url
 * @param config
 * @constructor
 */
function GetWithAuthentication(url: string, config?: AxiosRequestConfig) {
  config = useAuthentication(config);
  return Get(url, config);
}

/**
 * Post call with axios instance
 * @param url
 * @param config
 * @constructor
 */
function Post(url: string, config?: AxiosRequestConfig) {
  const fullUrl = formUrl(url);
  const data = config && config.data;
  config = {};
  // config = {headers: headers(config, url), ...config};
  return axiosInstance
    .post(fullUrl, data, config)
    .then(
      (response: any) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        return response.data;
      },
      (error: any) => {
        throw error.config;
      }
    )
    .catch((error: any) => {
      console.log(error.request);
      console.log(error.response);
      console.log(error.message);
      throw error.config;
    });
}

/**
 * Post call with axios instance with Authentication
 * @param url
 * @param config
 * @constructor
 */
function PostWithAuthentication(url: string, config?: AxiosRequestConfig) {
  return Post(url, config);
}

/**
 * Delete call with axios instance
 * @param url
 * @param config
 * @constructor
 */
function Delete(url: string, config?: AxiosRequestConfig) {
  const fullUrl = formUrl(url);
  return axiosInstance
    .delete(fullUrl, config)
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error.message);
      throw error.config;
    });
}

export {Get, GetWithAuthentication, Post, PostWithAuthentication, Delete};
