import React, {useEffect} from 'react';
import {GetLoginStoreData, LoadUserInfoAction} from '../redux';

const UserInfo = () => {
  const userProps = GetLoginStoreData() || {};
  const loadUser = LoadUserInfoAction();
  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    loadUser();
  }, []);

  return <div>authentication things {userProps.username}</div>;
};

export {UserInfo};
