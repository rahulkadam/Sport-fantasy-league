import {
  ACTION_START,
  GET_TEAM_LIST,
  GET_TEAM_LIST_ERROR,
  CREATE_SPORT_TEAM,
  CREATE_SPORT_TEAM_ERROR,
} from './sportteamConstants';

const initialState: SportTeam = {
  data: {},
  isLoading: false,
  hasError: false,
  statusMessage: '',
  teamList: [],
};

export default (state: SportTeam = initialState, action: any): SportTeam => {
  let tournamentState = {...state};
  switch (action.type) {
    case GET_TEAM_LIST:
      tournamentState = {
        ...state,
        teamList: action.teamList,
        isLoading: false,
      };
      return tournamentState;
    case ACTION_START:
      tournamentState = {
        ...state,
        isLoading: true,
        hasError: false,
        statusMessage: '',
      };
      return tournamentState;
    case GET_TEAM_LIST_ERROR:
      tournamentState = {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage:
          'Error Occured while performing action, please check your last action',
      };
      return tournamentState;
    case CREATE_SPORT_TEAM:
      tournamentState = {
        ...state,
        statusMessage: action.message,
        isLoading: false,
      };
      return tournamentState;
    case CREATE_SPORT_TEAM_ERROR:
      tournamentState = {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage: action.data,
      };
      return tournamentState;
    default:
      return state;
  }
};
