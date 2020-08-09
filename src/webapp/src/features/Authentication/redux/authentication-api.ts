import {Get} from 'API';

export function loadUserInfo() {
  return Get('/fantasy/user/me');
}
