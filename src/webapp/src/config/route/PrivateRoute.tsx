import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';
import {GetLoginStoreData} from 'features/Authentication/redux';

const PrivateRoute = ({children, ...rest}: {[key: string]: any}) => {
  const loggedUser = GetLoginStoreData();

  function isValid() {
    console.log('ROle ', rest.role);
    return loggedUser.id && loggedUser.role == rest.role;
  }

  return (
    <Route
      {...rest}
      render={location =>
        isValid() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: {from: location.location},
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

PrivateRoute.defaultProps = {
  children: {},
};

export {PrivateRoute};
