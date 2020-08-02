import {useDispatch} from 'react-redux';
import {createPlayer, fetchAllPlayerList, addTeamToPlayer} from './player-api';
import {
  ACTION_START,
  CREATE_PLAYER,
  CREATE_PLAYER_ERROR,
  GET_PLAYER_LIST,
  GET_PLAYER_LIST_ERROR,
} from './playerConstants';
import {dispatchActionWrapper, dispatchAction} from 'common/util';

const fetchPlayerListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchAllPlayerList()
        .then((data: any) => {
          dispatch({
            type: GET_PLAYER_LIST,
            playerList: data,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: GET_PLAYER_LIST_ERROR,
            data: error.message,
          });
        });
    }
  );
};

const createPlayerAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (name: string, country: string, value: number, type: string) => {
      createPlayer(name, country, value, type)
        .then((data: any) => {
          dispatch({
            type: CREATE_PLAYER,
            message: 'Created successfully',
          });
        })
        .catch((error: any) => {
          dispatch({
            type: CREATE_PLAYER_ERROR,
            data: error.message,
          });
        });
    }
  );
};

const addTeamToPlayerAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (playerId: number, teamId: number) => {
      addTeamToPlayer(playerId, teamId)
        .then((data: any) => {
          dispatch({
            type: CREATE_PLAYER,
            message: 'Created successfully',
          });
        })
        .catch((error: any) => {
          dispatch({
            type: CREATE_PLAYER_ERROR,
            data: error.message,
          });
        });
    }
  );
};

export {fetchPlayerListAction, createPlayerAction, addTeamToPlayerAction};
