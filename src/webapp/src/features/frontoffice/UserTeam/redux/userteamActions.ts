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
  FETCH_ALL_PLAYER_LIST_ERROR,
  FETCH_PLAYER_LIST_BY_USER,
  FETCH_PLAYER_LIST_BY_USER_ERROR,
  FETCH_USER_TEAM_ERROR,
  FETCH_USER_TEAM,
  SAVE_USER_TEAM,
  SAVE_USER_TEAM_ERROR,
  REMOVE_FROM_INTERNAL_USER_TEAM,
  FETCH_GAME_CRITERIA,
  FETCH_GAME_CRITERIA_ERROR,
  RESET_INTERNAL_USER_TEAM,
} from './userteamConstants';
import {
  dispatchActionWrapper,
  dispatchAction,
  getErrorMessage,
} from 'common/util';

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
        })
        .catch((error: any) => {
          dispatch({
            type: FETCH_ALL_PLAYER_LIST_ERROR,
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
    (userid: number) => {
      fetchUserTeamByUser(userid)
        .then((data: any) => {
          dispatch({
            type: FETCH_USER_TEAM,
            userteam: data,
          });
          fetchPlayerlistByUser(data[0].id)
            .then((data: any) => {
              dispatch({
                type: FETCH_PLAYER_LIST_BY_USER,
                userTeamPlayers: data,
              });
            })
            .catch((error: any) => {
              dispatch({
                type: FETCH_PLAYER_LIST_BY_USER_ERROR,
                errorMessage: getErrorMessage(error),
              });
            });
        })
        .catch((error: any) => {
          dispatch({
            type: FETCH_USER_TEAM_ERROR,
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
    dispatch({
      type: RESET_INTERNAL_USER_TEAM,
    });
  });
};

const saveUserTeamAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (userteamId: number, playerList: any) => {
      saveTeamForUser(userteamId, playerList)
        .then((data: any) => {
          dispatch({
            type: SAVE_USER_TEAM,
            saveuserTeamData: data,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: SAVE_USER_TEAM_ERROR,
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
        })
        .catch((error: any) => {
          dispatch({
            type: SAVE_USER_TEAM_ERROR,
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
        })
        .catch((error: any) => {
          dispatch({
            type: FETCH_GAME_CRITERIA_ERROR,
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
};
