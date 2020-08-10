import React, {Fragment} from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';

import {Logo} from 'common/components/Logo/Logo';
import {GetLoginStoreData} from '../../../Authentication/redux';
import {HeaderUser} from '../HeaderUser/HeaderUser';
import {fantasyLogo} from '@logos/index';

const HeaderMenu = () => {
  const loggedUser = GetLoginStoreData();

  const publicMenu = true;
  const userMenu = loggedUser.id && loggedUser.role == 'ROLE_USER';
  const adminMenu = loggedUser.id && loggedUser.role == 'ROLE_ADMIN';

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
              {publicMenu && (
                <Nav.Link as={Link} to="/" href="#">
                  Home
                </Nav.Link>
              )}
              {userMenu && (
                <Nav.Link as={Link} to="/league" href="#">
                  League
                </Nav.Link>
              )}
              {userMenu && (
                <Nav.Link as={Link} to="/team" href="#">
                  User Team
                </Nav.Link>
              )}
              {adminMenu && (
                <Nav.Link as={Link} to="/back/tournament" href="#">
                  Tournament
                </Nav.Link>
              )}
              {adminMenu && (
                <Nav.Link as={Link} to="/back/team" href="#">
                  Sport Team
                </Nav.Link>
              )}
              {adminMenu && (
                <Nav.Link as={Link} to="/back/player" href="#">
                  Player
                </Nav.Link>
              )}
              {adminMenu && (
                <Nav.Link as={Link} to="/back/match" href="#">
                  Match
                </Nav.Link>
              )}
              {adminMenu && (
                <Nav.Link as={Link} to="/back/venue" href="#">
                  Venue
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
