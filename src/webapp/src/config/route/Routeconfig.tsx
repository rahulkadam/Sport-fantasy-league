import React from 'react';
import Random from '../../features/random/components';
import {BillView} from '../../features/QuickPay/BillView/components';
import Login from '../../features/Authentication/components';
import {AutoDebitHome} from '../../features/AmdocsAutoDebit/components';
import PageNotFound from '../../common/components/ErrorPage';
import {App} from '../../features/Home/App';
import Counter from '../../features/counter/components';
import {HelpPage, TermsAndConditions} from '../../common/components';
import {QuickpayUnauth} from '../../features/QuickpayUnauth/QuickpayUnauth';
import {BillViewUnauth} from '../../features/BillViewUnauth/BillViewUnauth';

export const RouteConfig = {
  PublicRouteConfig: [
    {path: '/counter', component: Counter, key: 'counter'},
    {path: '/billview', component: BillView, key: 'billView'},
    {path: '/login', component: Login, key: 'login'},
    {path: '/home', redirect: '/', isRedirect: true, key: 'home'},
    {
      path: '/autodebit',
      component: <AutoDebitHome />,
      isPrivate: true,
      key: 'autodebit',
    },
    {path: '/random', component: <Random />, isPrivate: true, key: 'random'},
    {path: '/helppage', component: HelpPage, key: 'random'},
    {path: '/termsAndconditions', component: TermsAndConditions, key: 'random'},
    {path: '/quickpayu', component: QuickpayUnauth, key: 'quickpayunauth'},
    {path: '/billviewu', component: BillViewUnauth, key: 'billviewunauth'},
    {path: '/', component: App, isExact: true, key: 'homeslash'},
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
