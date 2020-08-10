import React from 'react';
import Login, {
  RedirectSuccessHandler,
  UserInfo,
} from 'features/Authentication/components';
import PageNotFound from 'common/components/ErrorPage';
import {HelpPage, TermsAndConditions} from 'common/components';
import {League} from 'features/league';
import {UserTeam} from 'features/UserTeam';
import {Tournament} from 'features/admin/Tournament';
import {SportTeam} from 'features/admin/SportTeam';
import {Player} from 'features/admin/player';
import {Venue} from 'features/admin/venue';
import {Match} from 'features/admin/Match';
import {FantasyHome} from 'features/home';

const UserRole = 'ROLE_USER';
const AdminRole = 'ROLE_ADMIN';

export const RouteConfig = {
  PublicRouteConfig: [
    {
      path: '/league',
      component: <League />,
      key: 'league',
      isPrivate: true,
      role: UserRole,
    },
    {
      path: '/team',
      component: <UserTeam />,
      key: 'team',
      isPrivate: true,
      role: UserRole,
    },
    {
      path: '/back/match',
      component: <Match />,
      isPrivate: true,
      key: 'backmatch',
      role: AdminRole,
    },
    {
      path: '/back/tournament',
      component: <Tournament />,
      isPrivate: true,
      key: 'backtournament',
      role: AdminRole,
    },
    {
      path: '/back/team',
      component: <SportTeam />,
      isPrivate: true,
      key: 'backteam',
      role: AdminRole,
    },
    {
      path: '/back/player',
      component: <Player />,
      isPrivate: true,
      key: 'backplayer',
      role: AdminRole,
    },
    {
      path: '/back/venue',
      component: <Venue />,
      isPrivate: true,
      key: 'backvenue',
      role: AdminRole,
    },
    {
      path: '/redirect/success',
      component: RedirectSuccessHandler,
      key: 'redirectsuccess',
    },
    {
      path: '/userinfo',
      component: UserInfo,
      key: 'userinfo',
    },
    {path: '/login', component: Login, key: 'login'},
    {path: '/home', redirect: '/', isRedirect: true, key: 'home'},
    {path: '/helppage', component: HelpPage, key: 'random'},
    {path: '/termsAndconditions', component: TermsAndConditions, key: 'random'},
    {path: '/', component: FantasyHome, isExact: true, key: 'homeslash'},
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
  role?: string;
}
