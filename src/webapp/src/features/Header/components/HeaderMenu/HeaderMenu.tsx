import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';

import {Logo} from 'common/components/Logo/Logo';
import {GetLoginStoreData} from '../../../Authentication/redux';
import {HeaderUser} from '../HeaderUser/HeaderUser';
import {fantasyLogo} from '@logos/index';

const HeaderMenu = () => {
  const loggedUser = GetLoginStoreData();

  return (
    <div>
      <Route>
        <Navbar collapseOnSelect={true} expand="md">
          <Navbar.Toggle />
          <Navbar.Brand as={Link} to="/">
            <Logo logoSource={fantasyLogo} width="56" />
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav>
              <Nav.Link as={Link} to="/league" href="#">
                League
              </Nav.Link>
              <Nav.Link as={Link} to="/team" href="#">
                User Team
              </Nav.Link>
              {loggedUser.username && (
                <Nav.Link as={Link} to="/back/tournament" href="#">
                  Tournament
                </Nav.Link>
              )}
              {loggedUser.username && (
                <Nav.Link as={Link} to="/back/league" href="#">
                  Admin League
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
