import {
  ACTION_START,
  ACTION_ERROR,
  GET_MOST_SCORING_USER_LIST,
  GET_MOST_PICKED_PLAYER_LIST,
  GET_TOP_PERFORMING_PLAYER_LIST,
  GET_UPCOMING_MATCHES_LIST,
} from './homeConstants';

const initialState: HomeData = {
  data: {},
  isLoading: false,
  hasError: false,
  statusMessage: '',
  topScoringUserList: [],
  leagueMatchesList: [],
  topPickedPlayerList: [],
  topScoringPlayerList: [],
};

export default (state: League = initialState, action: any): HomeData => {
  switch (action.type) {
    case ACTION_START:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case ACTION_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage: action.errorMessage,
      };
    case GET_UPCOMING_MATCHES_LIST:
      return {
        ...state,
        leagueMatchesList: action.data,
        isLoading: false,
        hasError: false,
      };
    case GET_MOST_SCORING_USER_LIST:
      return {
        ...state,
        topScoringUserList: action.data,
        isLoading: false,
        hasError: false,
      };
    case GET_MOST_PICKED_PLAYER_LIST:
      return {
        ...state,
        topPickedPlayerList: action.data,
        isLoading: false,
        hasError: false,
      };
    case GET_TOP_PERFORMING_PLAYER_LIST:
      return {
        ...state,
        topScoringPlayerList: action.data,
        isLoading: false,
        hasError: false,
      };
    default:
      return state;
  }
};
