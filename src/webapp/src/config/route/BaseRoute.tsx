import React, {Suspense} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {PrivateRoute} from './PrivateRoute';
import {Header} from '../../features/Header';
import {RouteConfig, RouteConfigObject} from './Routeconfig';
import {Footer} from '../../common/components/Footer';

function renderPrivateRoute(data: RouteConfigObject): JSX.Element {
  return (
    <PrivateRoute path={data.path} key={data.key} role={data.role}>
      {data.component}
    </PrivateRoute>
  );
}

function renderRedirectRoute(data: RouteConfigObject): JSX.Element {
  return (
    <Route path={data.path} key={data.key}>
      <Redirect to={data.redirect} />
    </Route>
  );
}

function renderPublicRoute(data: RouteConfigObject): JSX.Element {
  return <Route path={data.path} component={data.component} key={data.key} />;
}

function renderPublicExactRoute(data: RouteConfigObject): JSX.Element {
  return (
    <Route
      exact={data.isExact}
      path={data.path}
      component={data.component}
      key={data.key}
    />
  );
}

const BaseRoute = () => {
  function renderRoute(): [] {
    const routeArray = RouteConfig.PublicRouteConfig;
    const routeRenderArray: any = [];
    routeArray.forEach(data => {
      let element: RouteConfigObject;
      if (data.isPrivate) {
        element = renderPrivateRoute(data);
      } else if (data.isRedirect) {
        element = renderRedirectRoute(data);
      } else if (data.isExact) {
        element = renderPublicExactRoute(data);
      } else {
        element = renderPublicRoute(data);
      }
      routeRenderArray.push(element);
    });
    return routeRenderArray;
  }

  return (
    <div>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>{renderRoute()}</Switch>
        <Footer />
      </Suspense>
    </div>
  );
};

export {BaseRoute};
