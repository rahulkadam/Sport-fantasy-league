import React, {Fragment} from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';

import {Logo} from 'common/components/Logo/Logo';
import {GetLoginStoreData} from '../../../Authentication/redux';
import {HeaderUser} from '../HeaderUser/HeaderUser';
import {fantasyLogo} from '@logos/index';
import {getAccessToken} from 'API';
import {
  adminMenuConfig,
  commonPublicMenuConfig,
  userMenuConfig,
  userMenuConfigForMobile,
} from './MenuConfig';

const HeaderMenu = () => {
  const loggedUser = GetLoginStoreData();
  const isTokenValid = getAccessToken();

  const publicMenu = true;
  const userMenu =
    isTokenValid && loggedUser.id && loggedUser.role == 'ROLE_USER';
  const adminMenu =
    isTokenValid && loggedUser.id && loggedUser.role == 'ROLE_ADMIN';

  function renderMenuLink(name: string, link: string) {
    return (
      <Nav.Link as={Link} to={link} href="#">
        {name}
      </Nav.Link>
    );
  }

  function renderMenu(config: any) {
    const adminMenuArr: any = [];
    config.forEach((menu: any) => {
      adminMenuArr.push(renderMenuLink(menu.name, menu.link));
    });
    return adminMenuArr;
  }

  return (
    <div>
      <Route>
        <Navbar
          collapseOnSelect={true}
          expand="md"
          fixed={'top'}
          bg="dark"
          variant="dark">
          <Navbar.Toggle />
          <Navbar.Brand as={Link} to="/">
            <Logo logoSource={fantasyLogo} width="56" />
          </Navbar.Brand>
          <Nav className={'d-block d-md-none'}>
            {userMenu && renderMenu(userMenuConfigForMobile)}
          </Nav>
          <Navbar.Collapse className="justify-content-start">
            <Nav>
              {publicMenu && renderMenuLink('Home', '/')}
              {userMenu && renderMenu(userMenuConfig)}
              {adminMenu && renderMenu(adminMenuConfig)}
              {renderMenu(commonPublicMenuConfig)}
            </Nav>
            <Nav>
              <HeaderUser />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Route>
    </div>
  );
};

export {HeaderMenu};
