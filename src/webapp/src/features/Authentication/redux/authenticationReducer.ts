import {
  START_LOGGED_IN_USER,
  LOGGED_IN_USER,
  LOGGED_IN_USER_SUCCESS,
  LOGGED_OUT_USER,
  LOAD_USER_INFO_DETAILS,
  LOAD_USER_INFO_DETAILS_ERROR,
  ACTION_START,
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
    case LOAD_USER_INFO_DETAILS:
      userObj = action.userData;
      return {
        ...state,
        ...userObj,
        username: userObj.name,
      };
    case LOAD_USER_INFO_DETAILS_ERROR:
      userObj = action.value;
      return {
        ...state,
      };
    case START_LOGGED_IN_USER:
      return state;
    case LOGGED_IN_USER_SUCCESS:
      return state;
    case ACTION_START:
      return state;
    case LOGGED_OUT_USER:
      return initialState;
    default:
      return state;
  }
};
