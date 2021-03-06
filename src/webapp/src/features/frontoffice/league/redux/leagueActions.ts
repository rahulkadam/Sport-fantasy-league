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
  CREATE_LEAGUE,
  FETCH_PLAYER_LIST_BY_USER_IN_LEAGUE,
  FETCH_PLAYER_LIST_BY_USER_IN_LEAGUE_ERROR,
} from './leagueConstants';
import {
  dispatchActionWrapper,
  dispatchAction,
  getErrorMessage,
} from 'common/util';
import {fetchPlayerlistByUserForLeague} from '../../UserTeam/redux/userteam-api';
import {
  ACTION_COMPLETED,
  ACTION_REFRESH,
} from '../../../common/redux/commonConstants';

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
          dispatch({type: ACTION_COMPLETED});
        })
        .catch((error: any) => {
          dispatch({
            type: ACTION_ERROR,
            errorMessage: getErrorMessage(error),
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
          dispatch({type: ACTION_COMPLETED});
        })
        .catch((error: any) => {
          dispatch({
            type: ACTION_ERROR,
            errorMessage: getErrorMessage(error),
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
    (leagueCode: string) => {
      joinLeague(leagueCode)
        .then((data: any) => {
          dispatch({
            type: JOIN_LEAGUE,
            data: data,
          });
          dispatch({type: ACTION_COMPLETED});
          dispatch({type: ACTION_REFRESH});
        })
        .catch((error: any) => {
          dispatch({
            type: ACTION_ERROR,
            errorMessage: getErrorMessage(error),
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
          dispatch({type: ACTION_COMPLETED});
        })
        .catch((error: any) => {
          dispatch({
            type: ACTION_ERROR,
            errorMessage: getErrorMessage(error),
          });
        });
    }
  );
};

const fetchPlayerListByUserForLeagueAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (userid: number) => {
      fetchPlayerlistByUserForLeague(userid)
        .then((data: any) => {
          dispatch({
            type: FETCH_PLAYER_LIST_BY_USER_IN_LEAGUE,
            userTeam: data,
          });
          dispatch({type: ACTION_COMPLETED});
        })
        .catch((error: any) => {
          dispatch({type: FETCH_PLAYER_LIST_BY_USER_IN_LEAGUE_ERROR});
          dispatch({
            type: ACTION_ERROR,
            errorMessage: getErrorMessage(error),
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
  fetchPlayerListByUserForLeagueAction,
};
