import {useDispatch} from 'react-redux';
import {
  fetchUserLeaguesDetails,
  fetchActiveLeaguesList,
  joinLeague,
} from './league-api';
import {
  ACTION_START,
  ACTION_ERROR,
  GET_USER_LEAGUE,
  GET_PUBLIC_LEAGUE_LIST,
} from './leagueConstants';
import {dispatchActionWrapper, dispatchAction} from 'common/util';

const fetchUserLeagueListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchUserLeaguesDetails()
        .then((data: any) => {
          dispatch({
            type: GET_USER_LEAGUE,
            userleagueList: data,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: ACTION_ERROR,
            data: error,
          });
        });
    }
  );
};

const fetchPublicLeagueListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchActiveLeaguesList()
        .then((data: any) => {
          dispatch({
            type: GET_PUBLIC_LEAGUE_LIST,
            data: data,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: ACTION_ERROR,
            data: error.message,
          });
        });
    }
  );
};

const joinLeagueAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (leagueCode: any) => {
      joinLeague(leagueCode)
        .then((data: any) => {
          dispatch({
            type: GET_PUBLIC_LEAGUE_LIST,
            data: data,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: ACTION_ERROR,
            data: error.message,
          });
        });
    }
  );
};

export {
  fetchUserLeagueListAction,
  fetchPublicLeagueListAction,
  joinLeagueAction,
};
