import {useDispatch} from 'react-redux';
import {getMatchStats, getPlayerStats, getUserStats} from './stats-api';
import {
  ACTION_START,
  ACTION_ERROR,
  FETCH_MATCH_STATS,
  FETCH_PLAYER_STATS,
  FETCH_USER_STATS,
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
    (userId: number) => {
      getUserStats(userId)
        .then((data: any) => {
          dispatch({
            type: FETCH_USER_STATS,
            userStats: data,
          });
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
    (playerId: number) => {
      getPlayerStats(playerId)
        .then((data: any) => {
          dispatch({
            type: FETCH_PLAYER_STATS,
            playerStats: data,
          });
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
    (matchId: number) => {
      getMatchStats(matchId)
        .then((data: any) => {
          dispatch({
            type: FETCH_PLAYER_STATS,
            playerStats: data,
          });
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
