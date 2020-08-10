import {AxiosRequestConfig} from 'axios';
import {
  axiosInstance,
  useAuthentication,
  formUrl,
  headers,
  checkInvalidAccess,
} from './httpUtil';

/**
 * axios get Request
 * @param url
 * @param config
 * @constructor
 */
function Get(url: string, config?: AxiosRequestConfig) {
  config = useAuthentication(config);
  const fullUrl = formUrl(url);
  config = {headers: headers(config, url), ...config};
  return axiosInstance.get(fullUrl, config).then(
    (response: any) => {
      return response.data;
    },
    (error: any) => {
      console.log(error.message);
      console.log(error.config);
      checkInvalidAccess(error);
      throw error;
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
  config = useAuthentication(config);
  // config = {headers: headers(config, url), ...config};
  return axiosInstance.post(fullUrl, data, config).then(
    (response: any) => {
      console.log(response.data);
      return response.data;
    },
    (error: any) => {
      throw error;
    }
  );
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
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      throw error;
    });
}

export {Get, GetWithAuthentication, Post, PostWithAuthentication, Delete};
