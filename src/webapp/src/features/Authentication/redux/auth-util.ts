import {UserLogOutActions} from './authenticationActions';

export function checkUserAccess(message: string) {
  const UserLogOut = UserLogOutActions();
  if (message == 'Unauthorized') {
    UserLogOut();
  }
}
