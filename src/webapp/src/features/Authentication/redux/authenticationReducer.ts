import {
  START_LOGGED_IN_USER,
  LOGGED_IN_USER,
  LOGGED_IN_USER_SUCCESS,
  LOGGED_IN_USER_FAILURE,
  LOGGED_OUT_USER,
} from './authenticationConstants';

const initialState: User = {
  username: '',
  firstname: '',
  lastname: '',
  userid: '',
  isAuthenticated: false,
  isauthenticating: false,
};

export default (state: User = initialState, action: any): User => {
  let userObj: User;
  switch (action.type) {
    case LOGGED_IN_USER:
      userObj = action.value;
      return {
        ...state,
        ...userObj,
      };
    case START_LOGGED_IN_USER:
      return state;
    case LOGGED_IN_USER_SUCCESS:
      return state;
    case LOGGED_IN_USER_FAILURE:
      return state;
    case LOGGED_OUT_USER:
      return state;
    default:
      return state;
  }
};
