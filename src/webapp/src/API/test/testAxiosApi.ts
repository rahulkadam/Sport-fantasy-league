import MockAdapter from 'axios-mock-adapter';
import axios, {AxiosInstance} from 'axios';
import {apiBaseRootUrl} from '../httpUtil';

function GetMockAdapterInstance(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance = axios.create();
  const mock = new MockAdapter(axiosInstance);
  const apiBaseUrl = apiBaseRootUrl();
  mock
    .onGet(
      'https://www.random.org/integers/?num=1&min=1&max=99&col=1&base=10&format=plain&rnd=new'
    )
    .reply(200, 37);

  mock.onGet(apiBaseUrl + '/userbill/12345').reply(200, {
    userid: 101,
    username: `rahulkada`,
    isFetching: false,
    accountNumber: 12345,
  });
  return axiosInstance;
}

export {GetMockAdapterInstance};
