import {useDispatch} from 'react-redux';
import {
  fetchAllPlayerlist,
  fetchPlayerlistByUser,
  fetchUserTeamByUser,
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
          fetchPlayerlistByUser(76)
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
    (rows: any) => {
      dispatch({
        type: UPDATE_INTERNAL_USER_TEAM,
        rows: rows,
      });
    }
  );
};

export {
  fetchPlayerListByUserAction,
  fetchAllPlayerListAction,
  addRemovePlayerToInternalUserTeamAction,
};
