import {useDispatch} from 'react-redux';
import {
  fetchAllPlayerlist,
  saveTeamForUser,
  createTeamForUser,
  fetchGameCriteriaByName,
  fetchUserTeamFullDataByUser,
} from './userteam-api';
import {
  ACTION_START,
  UPDATE_INTERNAL_USER_TEAM,
  FETCH_ALL_PLAYER_LIST,
  SAVE_USER_TEAM,
  REMOVE_FROM_INTERNAL_USER_TEAM,
  FETCH_GAME_CRITERIA,
  RESET_INTERNAL_USER_TEAM,
  UPDATE_CAPTION_FOR_TEAM,
  AUTO_PICK_USER_TEAM,
  SHOULD_REFRESH_STOP,
  ACTION_ERROR,
  FETCH_USER_TEAM_WITH_PLAYERS,
  USER_TEAM_ACTION_START,
  USER_TEAM_ACTION_STOP,
} from './userteamConstants';
import {
  dispatchActionWrapper,
  dispatchAction,
  getErrorMessage,
} from 'common/util';
import {
  ACTION_COMPLETED,
  ACTION_REFRESH,
} from '../../../common/redux/commonConstants';

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

const fetchUserTeamDataAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    dispatchAction(dispatch, USER_TEAM_ACTION_START),
    dispatchAction(dispatch, SHOULD_REFRESH_STOP),
    (userid: number) => {
      fetchUserTeamFullDataByUser(userid)
        .then((data: any) => {
          dispatch({
            type: FETCH_USER_TEAM_WITH_PLAYERS,
            userteam: data || {},
          });
          dispatch({type: ACTION_COMPLETED});
        })
        .catch((error: any) => {
          dispatchAction(dispatch, USER_TEAM_ACTION_STOP),
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
  fetchAllPlayerListAction,
  addRemovePlayerToInternalUserTeamAction,
  saveUserTeamAction,
  createUserTeamAction,
  fetchGameCriteriaByNameAction,
  resetUserTeamAction,
  updateTeamCaptionAction,
  autoPickUserTeamAction,
  fetchUserTeamDataAction,
};
