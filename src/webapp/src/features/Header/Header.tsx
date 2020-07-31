import React from 'react';
import {HeaderMenu} from './components/HeaderMenu/HeaderMenu';
import './Header.scss';

const Header = () => {
  return (
    <div>
      <header className="header">
        <HeaderMenu />
      </header>
    </div>
  );
};

export {Header};
