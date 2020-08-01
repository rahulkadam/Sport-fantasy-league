import {useDispatch} from 'react-redux';
import {createTournament, fetchAllTournamentList} from './tournament-api';
import {
  ACTION_START,
  CREATE_TOURNAMENT,
  CREATE_TOURNAMENT_ERROR,
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

export {fetchTournamentListAction, createTournamentAction};
