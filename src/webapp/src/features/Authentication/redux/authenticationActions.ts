import {useDispatch} from 'react-redux';
import {
  ACTION_START,
  LOAD_USER_INFO_DETAILS,
  LOAD_USER_INFO_DETAILS_ERROR,
  LOGGED_IN_USER,
  LOGGED_OUT_USER,
} from './authenticationConstants';
import {
  dispatchAction,
  dispatchActionWrapper,
  getErrorMessage,
} from 'common/util';
import {loadUserInfo} from './authentication-api';

export const LogActions = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(dispatch, (authUser: any) => {
    dispatch({
      type: LOGGED_IN_USER,
      value: {...authUser},
    });
  });
};

export const UserLogOutActions = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(dispatch, (authUser: any) => {
    dispatch({
      type: LOGGED_OUT_USER,
    });
  });
};

export const LoadUserInfoAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      loadUserInfo()
        .then((data: any) => {
          dispatch({
            type: LOAD_USER_INFO_DETAILS,
            userData: data,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: LOAD_USER_INFO_DETAILS_ERROR,
            errorMessage: getErrorMessage(error),
          });
        });
    }
  );
};
