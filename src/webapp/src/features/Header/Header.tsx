import React, {useEffect} from 'react';
import {HeaderMenu} from './components/HeaderMenu/HeaderMenu';
import './Header.scss';
import {getAccessToken} from '../../API';
import {UserLogOutActions} from '../Authentication/redux';

const Header = () => {
  const userLogOutAction = UserLogOutActions();
  useEffect(() => {
    if (!getAccessToken()) {
      userLogOutAction();
    }
  });
  return (
    <div>
      <header className="header">
        <HeaderMenu />
      </header>
    </div>
  );
};

export {Header};
