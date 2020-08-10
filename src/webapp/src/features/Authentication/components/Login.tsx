import React from 'react';
import {GetLoginStoreData} from '../redux';

const Login = () => {
  const loginUserData = GetLoginStoreData();
  const authUserName = loginUserData.username;
  const GOOGLE_AUTH_URL =
    'http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect';

  return (
    <div>
      {!authUserName && <a href={GOOGLE_AUTH_URL}>Login via Google</a>}
      {authUserName && <div>Welcome {authUserName}</div>}
    </div>
  );
};

export default Login;
