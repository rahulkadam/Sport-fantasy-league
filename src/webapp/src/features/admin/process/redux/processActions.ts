import {useDispatch} from 'react-redux';
import {
  addNotice,
  clearCacheByName,
  fetchActiveNotice,
  initiateMatchSquadFromCricAPI,
  initUserMatchForTournament,
  lockTournament,
  processPointByMatchId,
  processRanking,
  removeNotice,
  statrCompleteMatch,
  toggleTaskSchedularForScoreAPI,
  unLockTournament,
  updateFantasyConfig,
  updateMatchPlayerScoreFromCricAPI,
} from './process-api';
import {
  PROCESS_ACTION_COMPLETED,
  PROCESS_ACTION_ERROR,
  PROCESS_ACTION_START,
  PROCESS_FETCH_NOTICE_LIST,
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
      lockTournament(id)
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

export const statrCompleteMatchAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, PROCESS_ACTION_START),
    (matchId: number, action: string) => {
      statrCompleteMatch(matchId, action)
        .then((data: any) => {
          dispatch({
            type: PROCESS_ACTION_COMPLETED,
            message: 'Match  started/completed successfully',
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

export const initUserMatchDataAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, PROCESS_ACTION_START),
    (matchId: number, type: string) => {
      initUserMatchForTournament(matchId, type)
        .then((data: any) => {
          dispatch({
            type: PROCESS_ACTION_COMPLETED,
            message: 'User/Match Details initiated successfully',
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

export const initMatchSquadFromCricAPIAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, PROCESS_ACTION_START),
    (matchId: number) => {
      initiateMatchSquadFromCricAPI(matchId)
        .then((data: any) => {
          dispatch({
            type: PROCESS_ACTION_COMPLETED,
            message:
              'Initiated Squad from CricAPI Details initiated successfully',
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

export const updateMatchPlayerScoreFromCricAPIAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, PROCESS_ACTION_START),
    (matchId: number) => {
      updateMatchPlayerScoreFromCricAPI(matchId)
        .then((data: any) => {
          dispatch({
            type: PROCESS_ACTION_COMPLETED,
            message:
              'Update Player Score from CricAPI Details initiated successfully',
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
      unLockTournament(id)
        .then((data: any) => {
          dispatch({
            type: PROCESS_ACTION_COMPLETED,
            message: 'Tournament  UnLocked successfully',
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

export const fetchNoticeListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, PROCESS_ACTION_START),
    (id: number) => {
      fetchActiveNotice()
        .then((data: any) => {
          dispatch({
            type: PROCESS_FETCH_NOTICE_LIST,
            data: data,
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

export const addNoticeAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, PROCESS_ACTION_START),
    (msg: string) => {
      addNotice(msg)
        .then(() => {
          dispatch({
            type: PROCESS_ACTION_COMPLETED,
            message: 'Notice Added',
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

export const disableNoticeAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, PROCESS_ACTION_START),
    (id: number) => {
      removeNotice(id)
        .then(() => {
          dispatch({
            type: PROCESS_ACTION_COMPLETED,
            message: 'Notice Removed Successfully',
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

export const toggleTaskSchedularAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, PROCESS_ACTION_START),
    () => {
      toggleTaskSchedularForScoreAPI()
        .then((data: any) => {
          dispatch({
            type: PROCESS_ACTION_COMPLETED,
            message: data,
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

export const clearCacheByNameAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, PROCESS_ACTION_START),
    (cacheName: string) => {
      clearCacheByName(cacheName)
        .then((data: any) => {
          dispatch({
            type: PROCESS_ACTION_COMPLETED,
            message: data,
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

export const updateFantasyConfigAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, PROCESS_ACTION_START),
    (key: string, value: string) => {
      updateFantasyConfig(key, value)
        .then((data: any) => {
          dispatch({
            type: PROCESS_ACTION_COMPLETED,
            message: 'Value Updated successfully',
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
