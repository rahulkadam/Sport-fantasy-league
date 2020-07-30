import {useDispatch} from 'react-redux';
import {LOGGED_IN_USER} from './authenticationConstants';
import {dispatchActionWrapper} from 'common/util';

export const LogActions = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(dispatch, (authUser: any) => {
    dispatch({
      type: LOGGED_IN_USER,
      value: {...authUser},
    });
  });
};
