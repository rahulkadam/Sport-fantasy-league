import {useDispatch} from 'react-redux';
import {fetchAllPlayerlist, fetchPlayerlistByUser} from './userteam-api';
import {
  ACTION_START,
  ACTION_ERROR,
  GET_USER_LEAGUE,
  FETCH_ALL_PLAYER_LIST,
  FETCH_ALL_PLAYER_LIST_ERROR,
  FETCH_PLAYER_LIST_BY_USER,
  FETCH_PLAYER_LIST_BY_USER_ERROR,
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
      fetchPlayerlistByUser(userid)
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
    }
  );
};

export {fetchPlayerListByUserAction, fetchAllPlayerListAction};
