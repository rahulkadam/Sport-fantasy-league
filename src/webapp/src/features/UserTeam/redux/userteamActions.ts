import {useDispatch} from 'react-redux';
import {
  fetchAllPlayerlist,
  fetchPlayerlistByUser,
  fetchUserTeamByUser,
  saveTeamForUser,
  createTeamForUser,
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
} from './userteamConstants';
import {dispatchActionWrapper, dispatchAction} from 'common/util';

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
            data: error.message,
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
                data: error.message,
              });
            });
        })
        .catch((error: any) => {
          dispatch({
            type: FETCH_USER_TEAM_ERROR,
            data: error.message,
          });
        });
    }
  );
};

const addRemovePlayerToInternalUserTeamAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (rows: any, action?: string) => {
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
    }
  );
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
            data: error.message,
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
    (userId: number, name: string) => {
      createTeamForUser(userId, name)
        .then((data: any) => {
          dispatch({
            type: SAVE_USER_TEAM,
            saveuserTeamData: data,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: SAVE_USER_TEAM_ERROR,
            data: error.message,
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
};
