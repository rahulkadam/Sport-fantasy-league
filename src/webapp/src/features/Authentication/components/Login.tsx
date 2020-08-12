import React, {Fragment} from 'react';
import {getLoginRedirectionUrl, GetLoginStoreData} from '../redux';
import {Logo} from 'common/components';
import {googleLogo} from '@logos/index';

const Login = () => {
  const loginUserData = GetLoginStoreData();
  const authUserName = loginUserData.username;
  const GOOGLE_AUTH_URL = getLoginRedirectionUrl();

  return (
    <div>
      {!authUserName && (
        <a href={GOOGLE_AUTH_URL}>
          <Logo logoSource={googleLogo} width="26" />
          Login via Google
        </a>
      )}
      {authUserName && <div>Welcome {authUserName}</div>}
    </div>
  );
};

export default Login;
