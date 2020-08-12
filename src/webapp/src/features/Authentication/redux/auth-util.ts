import {UserLogOutActions} from './authenticationActions';
import {domainName} from '../../../API';

export function checkUserAccess(message: string) {
  const UserLogOut = UserLogOutActions();
  if (message == 'Unauthorized') {
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
