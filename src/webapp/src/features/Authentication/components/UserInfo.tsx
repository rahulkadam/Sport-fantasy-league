import React, {useEffect} from 'react';
import {GetLoginStoreData, LoadUserInfoAction} from '../redux';
import LoadingOverlay from 'react-loading-overlay';
import history from 'common/config/history';

const UserInfo = () => {
  const userProps = GetLoginStoreData() || {};
  const loadUser = LoadUserInfoAction();
  useEffect(() => {
    loadUser();
  }, []);

  function goToHome() {
    history.push('/');
  }

  return (
    <div>
      <LoadingOverlay
        active={!userProps.username}
        spinner
        text="Loading User Info Details ...">
        {userProps.username && goToHome()}
      </LoadingOverlay>
    </div>
  );
};

export {UserInfo};
