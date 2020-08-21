import {useDispatch} from 'react-redux';
import {
  addNotice,
  fetchActiveNotice,
  lockTournament,
  processPointByMatchId,
  processRanking,
  removeNotice,
  unLockTournament,
} from './process-api';
import {
  PROCESS_ACTION_COMPLETED,
  PROCESS_ACTION_ERROR,
  PROCESS_ACTION_START,
} from './processConstants';
import {
  dispatchActionWrapper,
  dispatchAction,
  getErrorMessage,
} from 'common/util';

export const lockTournamentAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, PROCESS_ACTION_START),
    (id: number, matchId: number) => {
      lockTournament(id, matchId)
        .then((data: any) => {
          dispatch({
            type: PROCESS_ACTION_COMPLETED,
            message: 'Tournament  Locked successfully',
          });
        })
        .catch((error: any) => {
          dispatch({
            type: PROCESS_ACTION_ERROR,
            data: getErrorMessage(error),
          });
        });
    }
  );
};

export const unLockTournamentAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, PROCESS_ACTION_START),
    (id: number, matchId: number) => {
      unLockTournament(id, matchId)
        .then((data: any) => {
          dispatch({
            type: PROCESS_ACTION_COMPLETED,
            message: 'Tournament  Locked successfully',
          });
        })
        .catch((error: any) => {
          dispatch({
            type: PROCESS_ACTION_ERROR,
            data: getErrorMessage(error),
          });
        });
    }
  );
};

export const processRankingAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, PROCESS_ACTION_START),
    (id: number) => {
      processRanking(id)
        .then((data: any) => {
          dispatch({
            type: PROCESS_ACTION_COMPLETED,
            message: 'Tournament  Ranking processed successfully',
          });
        })
        .catch((error: any) => {
          dispatch({
            type: PROCESS_ACTION_ERROR,
            data: getErrorMessage(error),
          });
        });
    }
  );
};

export const processScoreByMatchAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, PROCESS_ACTION_START),
    (id: number) => {
      processPointByMatchId(id)
        .then((data: any) => {
          dispatch({
            type: PROCESS_ACTION_COMPLETED,
            message: 'Match Score and Point calculation processed successfully',
          });
        })
        .catch((error: any) => {
          dispatch({
            type: PROCESS_ACTION_ERROR,
            data: getErrorMessage(error),
          });
        });
    }
  );
};
