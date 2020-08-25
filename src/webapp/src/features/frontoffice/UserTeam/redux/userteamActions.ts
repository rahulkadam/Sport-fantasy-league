import {useDispatch} from 'react-redux';
import {
  fetchAllPlayerlist,
  fetchPlayerlistByUser,
  fetchUserTeamByUser,
  saveTeamForUser,
  createTeamForUser,
  fetchGameCriteriaByName,
} from './userteam-api';
import {
  ACTION_START,
  UPDATE_INTERNAL_USER_TEAM,
  FETCH_ALL_PLAYER_LIST,
  FETCH_PLAYER_LIST_BY_USER,
  FETCH_USER_TEAM,
  SAVE_USER_TEAM,
  REMOVE_FROM_INTERNAL_USER_TEAM,
  FETCH_GAME_CRITERIA,
  RESET_INTERNAL_USER_TEAM,
  UPDATE_CAPTION_FOR_TEAM,
  AUTO_PICK_USER_TEAM,
  SHOULD_REFRESH_STOP,
  ACTION_ERROR,
} from './userteamConstants';
import {
  dispatchActionWrapper,
  dispatchAction,
  getErrorMessage,
  isListEmpty,
} from 'common/util';
import {ACTION_COMPLETED} from '../../../common/redux/commonConstants';

const fetchAllPlayerListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchAllPlayerlist()
        .then((data: any) => {
          dispatch({
            type: FETCH_ALL_PLAYER_LIST,
            playerList: data,
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

const fetchPlayerListByUserAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    dispatchAction(dispatch, SHOULD_REFRESH_STOP),
    (userid: number) => {
      fetchUserTeamByUser(userid)
        .then((data: any) => {
          dispatch({
            type: FETCH_USER_TEAM,
            userteam: data,
          });
          dispatch({type: ACTION_COMPLETED});
          !isListEmpty(data) &&
            fetchPlayerlistByUser(data[0].id)
              .then((data: any) => {
                dispatch({
                  type: FETCH_PLAYER_LIST_BY_USER,
                  userTeamPlayers: data,
                });
                dispatch({type: ACTION_COMPLETED});
              })
              .catch((error: any) => {
                dispatch({
                  type: ACTION_ERROR,
                  errorMessage: getErrorMessage(error),
                });
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

const addRemovePlayerToInternalUserTeamAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(dispatch, (rows: any, action?: string) => {
    if (action == 'REMOVE') {
      dispatch({
        type: REMOVE_FROM_INTERNAL_USER_TEAM,
        rows: rows,
      });
    } else {
      dispatch({
        type: UPDATE_INTERNAL_USER_TEAM,
        rows: rows,
      });
    }
  });
};

const resetUserTeamAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(dispatch, () => {
    dispatchAction(dispatch, ACTION_START),
      dispatch({
        type: RESET_INTERNAL_USER_TEAM,
      });
    dispatch({type: ACTION_COMPLETED});
  });
};

const updateTeamCaptionAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(dispatch, (captainId: any) => {
    dispatch({
      type: UPDATE_CAPTION_FOR_TEAM,
      captainId: captainId,
    });
  });
};

const autoPickUserTeamAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, AUTO_PICK_USER_TEAM)
  );
};

const saveUserTeamAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (userteamId: number, playerList: any, captainId: any) => {
      saveTeamForUser(userteamId, playerList, captainId)
        .then((data: any) => {
          dispatch({
            type: SAVE_USER_TEAM,
            saveuserTeamData: data,
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

const createUserTeamAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (name: string) => {
      createTeamForUser(name)
        .then((data: any) => {
          dispatch({
            type: SAVE_USER_TEAM,
            saveuserTeamData: data,
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

const fetchGameCriteriaByNameAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (name: string) => {
      fetchGameCriteriaByName(name)
        .then((data: any) => {
          dispatch({
            type: FETCH_GAME_CRITERIA,
            gameCriteria: data,
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
  fetchPlayerListByUserAction,
  fetchAllPlayerListAction,
  addRemovePlayerToInternalUserTeamAction,
  saveUserTeamAction,
  createUserTeamAction,
  fetchGameCriteriaByNameAction,
  resetUserTeamAction,
  updateTeamCaptionAction,
  autoPickUserTeamAction,
};
