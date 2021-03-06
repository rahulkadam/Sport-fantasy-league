import {UserLogOutActions} from './authenticationActions';
import {domainName, getAccessToken} from '../../../API';
import {GA_USER_Event} from '../../../common/config';

export function checkUserAccess() {
  const UserLogOut = UserLogOutActions();
  if (!getAccessToken()) {
    GA_USER_Event('Check Logout Access');
    UserLogOut();
  }
}

export function getRedirectUrlforLocal() {
  const domain = domainName();
  let redirectUrl = domain;
  const port = window && window.location && window.location.port;
  const hostname = window && window.location && window.location.hostname;
  if (domain.includes('localhost') && port != '8080') {
    redirectUrl = 'http://' + hostname + port;
  }
  redirectUrl = redirectUrl + '/oauth2/redirect';
  return redirectUrl;
}

export function getLoginRedirectionUrl() {
  const domain = domainName();
  const redirectUrl = getRedirectUrlforLocal();
  const GOOGLE_AUTH_URL =
    domain + '/oauth2/authorize/google?redirect_uri=' + redirectUrl;
  return GOOGLE_AUTH_URL;
}
