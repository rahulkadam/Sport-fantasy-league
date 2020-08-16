import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Navbar} from 'react-bootstrap';

import {
  GetLoginStoreData,
  UserLogOutActions,
} from '../../../Authentication/redux';
import {Logo, UserAvatar} from 'common/components';
import {fantasyLogo, googleLogo} from '@logos/index';
import {getAccessToken, removeAccessToken} from '../../../../API';

const HeaderUser = () => {
  const loggedUser = GetLoginStoreData();
  const history = useHistory();
  const userLogOutAction = UserLogOutActions();

  useEffect(() => {
    if (!getAccessToken()) {
      userLogOutAction();
    }
  });

  function loginUser() {
    history.replace(`/login`);
  }

  function logoutUser() {
    userLogOutAction();
    removeAccessToken();
    history.replace(`/home`);
  }

  return (
    <div>
      {!loggedUser.id && (
        <Button variant="primary" onClick={() => loginUser()}>
          Login
        </Button>
      )}
      {loggedUser.id && <UserAvatar user={loggedUser} logout={logoutUser} />}
    </div>
  );
};

export {HeaderUser};
