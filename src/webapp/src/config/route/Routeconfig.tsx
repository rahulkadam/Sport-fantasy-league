import React, {lazy} from 'react';
import Login, {
  RedirectSuccessHandler,
  UserInfo,
} from 'features/Authentication/components';

const Tournament = lazy(() => {
  return import('features/admin/Tournament/Tournament');
});

const SportTeam = lazy(() => {
  return import('features/admin/SportTeam/SportTeam');
});

const Match = lazy(() => {
  return import('features/admin/Match/Match');
});

const Venue = lazy(() => {
  return import('features/admin/venue/Venue');
});

const Process = lazy(() => {
  return import('features/admin/process/AdminProcess');
});
const Player = lazy(() => {
  return import('features/admin/player/Player');
});
const League = lazy(() => {
  return import('features/frontoffice/league/League');
});

const UserTeam = lazy(() => {
  return import('features/frontoffice/UserTeam/UserTeam');
});

const FantasyHome = lazy(() => {
  return import('features/frontoffice/home/FantasyHome');
});

const fantasyStats = lazy(() => {
  return import('features/frontoffice/stats/FantasyStats');
});

const matchFixtures = lazy(() => {
  return import('features/frontoffice/fixtures/Fixtures');
});

const LiveMatch = lazy(() => {
  return import('features/frontoffice/matchlive/MatchLive');
});

const TermsAndConditions = lazy(() => {
  return import('common/components/TermsAndConditions');
});

const pointSystem = lazy(() => {
  return import('common/components/HelpPage/points/IPLPointSystems');
});

const HelpPage = lazy(() => {
  return import('common/components/HelpPage/HelpPage');
});

const PageNotFound = lazy(() => {
  return import('common/components/ErrorPage/PageNotFound');
});

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
      component: <UserTeam key="team1" />,
      key: 'team',
      isPrivate: true,
      role: UserRole,
    },
    {
      path: '/myteam/:tab',
      component: <UserTeam key="teamtransfer" />,
      key: 'teamtransfer',
      isPrivate: true,
      role: UserRole,
    },
    {
      path: '/fixtures',
      component: matchFixtures,
      key: 'fixtures',
    },
    {
      path: '/statistics',
      component: fantasyStats,
      key: 'statistics',
    },
    {
      path: '/matchlive',
      component: LiveMatch,
      key: 'matchlive',
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
      path: '/back/process',
      component: <Process />,
      isPrivate: true,
      key: 'backprocess',
      role: AdminRole,
    },
    {
      path: '/redirect',
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
    {path: '/helppage', component: HelpPage, key: 'helppage'},
    {path: '/helppoints', component: pointSystem, key: 'pointsystems'},
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
