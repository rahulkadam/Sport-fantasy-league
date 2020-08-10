import React from 'react';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';

import {GetLoginStoreData} from '../../../Authentication/redux';
import {UserAvatar} from '../../../../common/components';

const HeaderUser = () => {
  const loggedUser = GetLoginStoreData();
  const history = useHistory();

  function loginUser() {
    history.replace(`/login`);
  }

  function logoutUser() {
    localStorage.removeItem('fantasy_access_token');
    history.replace(`/league`);
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
