import {
  ACTION_START,
  GET_TOURNAMENT_LIST,
  GET_TOURNAMENT_LIST_ERROR,
  CREATE_TOURNAMENT,
  CREATE_TOURNAMENT_ERROR,
  GET_ERROR_LIST,
  GET_FANTASY_CONFIG_LIST,
} from './tournamentConstants';

const initialState: Tournament = {
  data: {playerList: []},
  isLoading: false,
  hasError: false,
  statusMessage: '',
  tournamentList: [],
  errorList: [],
  configList: [],
};

export default (state: Tournament = initialState, action: any): Tournament => {
  let tournamentState = {...state};
  switch (action.type) {
    case GET_TOURNAMENT_LIST:
      tournamentState = {
        ...state,
        tournamentList: action.tournamentList,
        isLoading: false,
      };
      return tournamentState;
    case GET_ERROR_LIST:
      tournamentState = {
        ...state,
        errorList: action.errorList,
        isLoading: false,
      };
      return tournamentState;
    case GET_FANTASY_CONFIG_LIST:
      tournamentState = {
        ...state,
        configList: action.configList,
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
    case GET_TOURNAMENT_LIST_ERROR:
      tournamentState = {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage:
          'Error Occured while performing action, please check your last action',
      };
      return tournamentState;
    case CREATE_TOURNAMENT:
      tournamentState = {
        ...state,
        statusMessage: action.message,
        isLoading: false,
      };
      return tournamentState;
    case CREATE_TOURNAMENT_ERROR:
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
