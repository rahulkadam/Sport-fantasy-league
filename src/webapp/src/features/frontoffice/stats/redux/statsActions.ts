import {useDispatch} from 'react-redux';
import {getMatchStats, getPlayerStats, getUserStats} from './stats-api';
import {
  ACTION_START,
  ACTION_ERROR,
  FETCH_MATCH_STATS,
  FETCH_PLAYER_STATS,
  FETCH_USER_STATS,
  ACTION_COMPLETED,
  CLEAR_PLAYER_STATS,
} from './statsConstants';
import {
  dispatchActionWrapper,
  dispatchAction,
  getErrorMessage,
} from 'common/util';

const fetchUserStatsListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    dispatchAction(dispatch, CLEAR_PLAYER_STATS),
    (userId: number, matchId: number) => {
      getUserStats(userId, matchId)
        .then((data: any) => {
          dispatch({
            type: FETCH_PLAYER_STATS,
            playerStats: data,
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

const fetchPlayerStatsListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    dispatchAction(dispatch, CLEAR_PLAYER_STATS),
    (playerId: number) => {
      getPlayerStats(playerId)
        .then((data: any) => {
          dispatch({
            type: FETCH_PLAYER_STATS,
            playerStats: data,
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

const fetchMatchStatsListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    dispatchAction(dispatch, CLEAR_PLAYER_STATS),
    (matchId: number) => {
      getMatchStats(matchId)
        .then((data: any) => {
          dispatch({
            type: FETCH_PLAYER_STATS,
            playerStats: data,
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
  fetchUserStatsListAction,
  fetchPlayerStatsListAction,
  fetchMatchStatsListAction,
};
