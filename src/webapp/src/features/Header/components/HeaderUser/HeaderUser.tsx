import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Navbar} from 'react-bootstrap';

import {
  GetLoginStoreData,
  UserLogOutActions,
} from '../../../Authentication/redux';
import {Logo, UserAvatar} from 'common/components';
import {fantasyLogo, googleLogo} from '@logos/index';

const HeaderUser = () => {
  const loggedUser = GetLoginStoreData();
  const history = useHistory();
  const userLogOutAction = UserLogOutActions();

  function loginUser() {
    history.replace(`/login`);
  }

  function logoutUser() {
    userLogOutAction();
    localStorage.removeItem('fantasy_access_token');
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
