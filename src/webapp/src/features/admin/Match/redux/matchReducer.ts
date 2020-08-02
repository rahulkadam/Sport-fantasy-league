import {
  ACTION_START,
  CREATE_MATCH_ERROR,
  CREATE_MATCH,
  GET_MATCH_LIST,
  GET_MATCH_LIST_ERROR,
} from './matchConstants';

const initialState: Match = {
  data: {},
  isLoading: false,
  hasError: false,
  statusMessage: '',
  playerList: [],
  matchList: [],
  tournamentList: [],
  venueList: [],
  teamList: [],
};

export default (state: Match = initialState, action: any): Match => {
  let playerState = {...state};
  switch (action.type) {
    case GET_MATCH_LIST:
      playerState = {
        ...state,
        matchList: action.matchList,
        isLoading: false,
      };
      return playerState;
    case ACTION_START:
      playerState = {
        ...state,
        isLoading: true,
        hasError: false,
        statusMessage: '',
      };
      return playerState;
    case GET_MATCH_LIST_ERROR:
      playerState = {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage:
          'Error Occured while performing action, please check your last action',
      };
      return playerState;
    case CREATE_MATCH:
      playerState = {
        ...state,
        statusMessage: action.message,
        isLoading: false,
      };
      return playerState;
    case CREATE_MATCH_ERROR:
      playerState = {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage: action.data,
      };
      return playerState;
    default:
      return state;
  }
};
