import {useDispatch} from 'react-redux';
import {
  createTournament,
  fetchAllTournamentList,
  fetchFantasyConfigData,
  fetchTop10Error,
} from './tournament-api';
import {
  ACTION_START,
  CREATE_TOURNAMENT,
  CREATE_TOURNAMENT_ERROR,
  GET_ERROR_LIST,
  GET_FANTASY_CONFIG_LIST,
  GET_TOURNAMENT_LIST,
  GET_TOURNAMENT_LIST_ERROR,
} from './tournamentConstants';
import {dispatchActionWrapper, dispatchAction} from 'common/util';

const fetchTournamentListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchAllTournamentList()
        .then((data: any) => {
          dispatch({
            type: GET_TOURNAMENT_LIST,
            tournamentList: data,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: GET_TOURNAMENT_LIST_ERROR,
            data: error.message,
          });
        });
    }
  );
};

const fetchTopErrorListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchTop10Error()
        .then((data: any) => {
          dispatch({
            type: GET_ERROR_LIST,
            errorList: data,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: GET_TOURNAMENT_LIST_ERROR,
            data: error.message,
          });
        });
    }
  );
};

const fetchFantasyConfigDataAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchFantasyConfigData()
        .then((data: any) => {
          dispatch({
            type: GET_FANTASY_CONFIG_LIST,
            configList: data,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: GET_TOURNAMENT_LIST_ERROR,
            data: error.message,
          });
        });
    }
  );
};

const createTournamentAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (name: string, country: string, sportName: string) => {
      createTournament(name, country, sportName)
        .then((data: any) => {
          dispatch({
            type: CREATE_TOURNAMENT,
            message: 'Created successfully',
          });
        })
        .catch((error: any) => {
          dispatch({
            type: CREATE_TOURNAMENT_ERROR,
            data: error.message,
          });
        });
    }
  );
};

export {
  fetchTournamentListAction,
  createTournamentAction,
  fetchTopErrorListAction,
  fetchFantasyConfigDataAction,
};
