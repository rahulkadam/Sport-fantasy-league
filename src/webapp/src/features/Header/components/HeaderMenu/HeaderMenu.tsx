import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';

import {Logo} from '../../../../common/components/Logo/Logo';
import {GetLoginStoreData} from '../../../Authentication/redux';
import {HeaderUser} from '../HeaderUser/HeaderUser';
import {astroLogo} from '@logos/index';

const HeaderMenu = () => {
  const loggedUser = GetLoginStoreData();

  return (
    <div>
      <Route>
        <Navbar collapseOnSelect={true} expand="md">
          <Navbar.Toggle />
          <Navbar.Brand as={Link} to="/">
            <Logo logoSource={astroLogo} width="56" />
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav>
              <Nav.Link as={Link} to="/" href="#">
                QuickPay
              </Nav.Link>
              <Nav.Link as={Link} to="/counter" href="#">
                APG View
              </Nav.Link>
              {loggedUser.username && (
                <Nav.Link as={Link} to="/random" href="#">
                  APG Stats
                </Nav.Link>
              )}
              {loggedUser.username && (
                <Nav.Link as={Link} to="/autodebit" href="#">
                  Auto Debit
                </Nav.Link>
              )}
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
