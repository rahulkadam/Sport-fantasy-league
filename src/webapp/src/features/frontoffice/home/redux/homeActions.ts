import {useDispatch} from 'react-redux';
import {
  fetchMostPickedPlayer,
  fetchTopPerformingPlayer,
  fetchTopScoreUserGlobally,
  fetchUpcomingMatches,
} from './home-api';
import {
  ACTION_START,
  ACTION_ERROR,
  GET_MOST_PICKED_PLAYER_LIST,
  GET_MOST_SCORING_USER_LIST,
  GET_TOP_PERFORMING_PLAYER_LIST,
  GET_UPCOMING_MATCHES_LIST,
} from './homeConstants';
import {
  dispatchActionWrapper,
  dispatchAction,
  getErrorMessage,
} from 'common/util';
import {ACTION_COMPLETED} from '../../../common/redux/commonConstants';

const fetchUpComingMatchesAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchUpcomingMatches()
        .then((data: any) => {
          dispatch({
            type: GET_UPCOMING_MATCHES_LIST,
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

const fetchTopPerformerPlayerAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchTopPerformingPlayer()
        .then((data: any) => {
          dispatch({
            type: GET_TOP_PERFORMING_PLAYER_LIST,
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

const fetchMostPickedPlayersAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchMostPickedPlayer()
        .then((data: any) => {
          dispatch({
            type: GET_MOST_PICKED_PLAYER_LIST,
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

const fetchMostScorerUserGloballyAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchTopScoreUserGlobally()
        .then((data: any) => {
          dispatch({
            type: GET_MOST_SCORING_USER_LIST,
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

export {
  fetchUpComingMatchesAction,
  fetchTopPerformerPlayerAction,
  fetchMostPickedPlayersAction,
  fetchMostScorerUserGloballyAction,
};
