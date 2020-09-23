import {useDispatch} from 'react-redux';
import {
  fetchUserTeamForLiveMatch,
  getLiveMatches,
  getPlayerScoreByLiveMatches,
} from './matchlive-api';
import {
  ACTION_START,
  ACTION_ERROR,
  ACTION_COMPLETED,
  FETCH_LIVE_MATCHES_LIST,
  FETCH_PLAYER_SCORE_BY_LIVE_MATCHES,
  FETCH_USER_TEAM_FOR_LIVE_MATCH,
} from './matchliveConstants';
import {
  dispatchActionWrapper,
  dispatchAction,
  getErrorMessage,
} from 'common/util';

const fetchLiveMatchListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      getLiveMatches()
        .then((data: any) => {
          dispatch({
            type: FETCH_LIVE_MATCHES_LIST,
            livematches: data,
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

const fetchPlayerScoreByLiveMatchesAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      getPlayerScoreByLiveMatches()
        .then((data: any) => {
          dispatch({
            type: FETCH_PLAYER_SCORE_BY_LIVE_MATCHES,
            livedata: data,
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

const fetchUserTeamByLiveMatchAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchUserTeamForLiveMatch()
        .then((data: any) => {
          dispatch({
            type: FETCH_USER_TEAM_FOR_LIVE_MATCH,
            userLiveTeam: data,
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

export {
  fetchLiveMatchListAction,
  fetchPlayerScoreByLiveMatchesAction,
  fetchUserTeamByLiveMatchAction,
};
