import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Button} from 'react-bootstrap';

import {
  GetLoginStoreData,
  UserLogOutActions,
} from '../../../Authentication/redux';
import {UserAvatar} from 'common/components';
import {getAccessToken, removeAccessToken} from 'API';
import LoginModal from '../../../Authentication/components/LoginModal';
import {GA_USER_Event} from '../../../../common/config';

const HeaderUser = () => {
  const loggedUser = GetLoginStoreData();
  const history = useHistory();
  const userLogOutAction = UserLogOutActions();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
      userLogOutAction();
    }
  });

  function renderLoginModal() {
    if (!showLoginModal) return;
    return (
      <LoginModal
        show={true}
        handleClose={(value: any) => setShowLoginModal(value)}
        handleShow={(value: any) => setShowLoginModal(value)}
      />
    );
  }

  function loginUser() {
    setShowLoginModal(true);
  }

  function logoutUser() {
    GA_USER_Event('Logout Success');
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
      {renderLoginModal()}
    </div>
  );
};

export {HeaderUser};
