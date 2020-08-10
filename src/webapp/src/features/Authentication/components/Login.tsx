import React, {Fragment} from 'react';
import {GetLoginStoreData} from '../redux';
import LoadingOverlay from 'react-loading-overlay';
import {Logo} from '../../../common/components';
import {googleLogo} from '@logos/index';

const Login = () => {
  const loginUserData = GetLoginStoreData();
  const authUserName = loginUserData.username;
  const GOOGLE_AUTH_URL =
    'http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect';

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
