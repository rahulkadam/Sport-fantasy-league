import {useDispatch} from 'react-redux';
import {
  fetchUserLeaguesDetails,
  fetchActiveLeaguesList,
  joinLeague,
  createLeague,
} from './league-api';
import {
  ACTION_START,
  ACTION_ERROR,
  GET_USER_LEAGUE,
  GET_PUBLIC_LEAGUE_LIST,
  JOIN_LEAGUE,
  JOIN_LEAGUE_ERROR,
  CREATE_LEAGUE,
  CREATE_LEAGUE_ERROR,
  CLEAR_STATUS_MESSAGE,
} from './leagueConstants';
import {dispatchActionWrapper, dispatchAction} from 'common/util';

const fetchUserLeagueListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (userId: number) => {
      fetchUserLeaguesDetails(userId)
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
            type: JOIN_LEAGUE,
            data: data,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: JOIN_LEAGUE_ERROR,
            data: error.message,
          });
        });
    }
  );
};

const createLeagueAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (request: CreateLeagueRequestObj) => {
      createLeague(request)
        .then((data: any) => {
          dispatch({
            type: CREATE_LEAGUE,
            data: data,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: CREATE_LEAGUE_ERROR,
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
  createLeagueAction,
};
