import React from 'react';
import Login from '../../features/Authentication/components';
import PageNotFound from '../../common/components/ErrorPage';
import {HelpPage, TermsAndConditions} from '../../common/components';
import {League} from 'features/league';
import {UserTeam} from 'features/UserTeam';
import {Tournament} from 'features/admin/Tournament';

export const RouteConfig = {
  PublicRouteConfig: [
    {path: '/league', component: League, key: 'league'},
    {path: '/team', component: UserTeam, key: 'team'},
    {
      path: '/back/tournament',
      component: <Tournament />,
      isPrivate: true,
      key: 'backtournament',
    },
    {
      path: '/back/league',
      component: <League />,
      isPrivate: true,
      key: 'backleague',
    },
    {path: '/login', component: Login, key: 'login'},
    {path: '/home', redirect: '/', isRedirect: true, key: 'home'},
    {path: '/helppage', component: HelpPage, key: 'random'},
    {path: '/termsAndconditions', component: TermsAndConditions, key: 'random'},
    {path: '/', component: League, isExact: true, key: 'homeslash'},
    {path: '*', component: PageNotFound, key: 'pageNotFound'},
  ],
};

export interface RouteConfigObject {
  path?: string;
  component?: any;
  key?: any;
  isRedirect?: boolean;
  isExact?: boolean;
  isPrivate?: boolean;
  redirect?: any;
}
