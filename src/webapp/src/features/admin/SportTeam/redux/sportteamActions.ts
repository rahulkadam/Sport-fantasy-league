import {useDispatch} from 'react-redux';
import {
  createTeam,
  fetchAllTeamList,
  addTournamentToTeam,
} from './sportteam-api';
import {
  ACTION_START,
  CREATE_SPORT_TEAM,
  CREATE_SPORT_TEAM_ERROR,
  GET_TEAM_LIST,
  GET_TEAM_LIST_ERROR,
} from './sportteamConstants';
import {dispatchActionWrapper, dispatchAction} from 'common/util';

const fetchTeamListAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    () => {
      fetchAllTeamList()
        .then((data: any) => {
          dispatch({
            type: GET_TEAM_LIST,
            teamList: data,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: GET_TEAM_LIST_ERROR,
            data: error.message,
          });
        });
    }
  );
};

const createTeamAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (name: string, country: string, sportName: string) => {
      createTeam(name, country, sportName)
        .then((data: any) => {
          dispatch({
            type: CREATE_SPORT_TEAM,
            message: 'Created successfully',
          });
        })
        .catch((error: any) => {
          dispatch({
            type: CREATE_SPORT_TEAM_ERROR,
            data: error.message,
          });
        });
    }
  );
};

const addTournamentToTeamAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(
    dispatch,
    dispatchAction(dispatch, ACTION_START),
    (teamId: number, tournamentId: number) => {
      addTournamentToTeam(teamId, tournamentId)
        .then((data: any) => {
          dispatch({
            type: CREATE_SPORT_TEAM,
            message: 'Created successfully',
          });
        })
        .catch((error: any) => {
          dispatch({
            type: CREATE_SPORT_TEAM_ERROR,
            data: error.message,
          });
        });
    }
  );
};

export {fetchTeamListAction, createTeamAction, addTournamentToTeamAction};
