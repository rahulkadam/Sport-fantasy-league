import React from 'react';
import {getLoginRedirectionUrl, GetLoginStoreData} from '../redux';
import {Logo} from 'common/components';
import {googleLogo} from '@logos/index';
import './Login.styles.scss';

const Login = () => {
  const loginUserData = GetLoginStoreData();
  const authUserName = loginUserData.username;
  const GOOGLE_AUTH_URL = getLoginRedirectionUrl();

  return (
    <div
      className="loginGoogleContainer"
      onClick={() => window.open(GOOGLE_AUTH_URL, '_self')}>
      {!authUserName && (
        <a href={GOOGLE_AUTH_URL}>
          <Logo logoSource={googleLogo} width="26" />
          <span className="googleText">Login via Google</span>
        </a>
      )}
      {authUserName && <div>Welcome {authUserName}</div>}
    </div>
  );
};

export default Login;
