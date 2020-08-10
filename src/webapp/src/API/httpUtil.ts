import axios, {AxiosRequestConfig} from 'axios';
import {GetMockAdapterInstance} from './test/testAxiosApi';

/**
 * default custom Instance
 */
const axiosInstance = axios.create();

/**
 *  Get Mock Instance of axios, which will return mock static response
 */
// const axiosInstance = GetMockAdapterInstance(axios);
axiosInstance.defaults.timeout = 5000;
axiosInstance.defaults.baseURL = 'https://api.example.com';
axiosInstance.defaults.headers.post['Content-Type'] = 'json';
/**
 * Adding function default validate request based on http status
 * @param status
 */
axiosInstance.defaults.validateStatus = function (status: number): boolean {
  if (status >= 200 && status < 400) {
    return true;
  }
  return false;
};

/**
 * Adding default http agent
 */
axiosInstance.defaults.httpAgent = {
  keepAlive: true,
};

axiosInstance.defaults.httpsAgent = {
  keepAlive: true,
};

function useAuthentication(config?: AxiosRequestConfig) {
  let token = localStorage.getItem('fantasy_access_token');
  token = 'Bearer ' + token;
  if (config && config.headers) {
    config.headers.common['Authorization'] = token;
  } else {
    return {
      headers: {
        Authorization: token,
      },
    };
  }
  return config;
}

function isAbsoluteUrl(url: string) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

/**
 * creating one basic security singature which we will be using for public PAI preventions
 * @param url
 */
function headerSecuritySignature(url: string) {
  const projectName = 'react-redux';
  const str = new Date();
  const timestamp = Date.parse(str.toDateString());
  const signatureInput = timestamp + '-' + projectName + '-' + url;
  return btoa(signatureInput);
}

/**
 * Function
 * @param Config
 */
function headers(Config: any, url: string) {
  if (isAbsoluteUrl(url)) return;
  const header = Config && Config.headers;
  return {
    'Access-Control-Allow-Origin': '*',
    // securitySignature: headerSecuritySignature(url),
    ...header,
  };
}

/**
 * Function to return API URL, mostly we will hit current host only, for accessing details
 */
function apiBaseRootUrl() {
  let backendHost;

  const hostname = window && window.location && window.location.hostname;
  const host = window && window.location && window.location.host;

  if (hostname === 'localhost') {
    backendHost = 'http://localhost:8080';
  } else {
    backendHost = 'https://' + host;
  }
  return backendHost;
}

function domainName(): string {
  return apiBaseRootUrl();
}

function formUrl(url: string) {
  if (isAbsoluteUrl(url)) {
    return url;
  }
  return domainName() + url;
}

export {
  headers,
  domainName,
  formUrl,
  apiBaseRootUrl,
  axiosInstance,
  useAuthentication,
  headerSecuritySignature,
};
