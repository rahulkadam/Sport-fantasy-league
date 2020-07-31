import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';

import {GetLoginStoreData, LogActions} from '../../../Authentication/redux';
import {UserAvatar} from '../../../../common/components';

const HeaderUser = () => {
  const loggedUser = GetLoginStoreData();
  const logUser = LogActions();
  const history = useHistory();

  function loginUser() {
    history.replace(`/login`);
  }

  function logoutUser() {
    logUser({
      username: '',
      firstname: '',
      lastname: '',
      userid: '',
      isAuthenticated: false,
    });
    history.replace(`/`);
  }

  return (
    <div>
      {!loggedUser.username && (
        <Button variant="primary" onClick={() => loginUser()}>
          Login
        </Button>
      )}
      {loggedUser.username && (
        <UserAvatar user={loggedUser} logout={logoutUser} />
      )}
    </div>
  );
};

export {HeaderUser};
