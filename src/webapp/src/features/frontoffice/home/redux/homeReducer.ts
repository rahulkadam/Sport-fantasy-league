import {
  GET_MOST_SCORING_USER_LIST,
  GET_MOST_PICKED_PLAYER_LIST,
  GET_TOP_PERFORMING_PLAYER_LIST,
  GET_UPCOMING_MATCHES_LIST,
} from './homeConstants';

const initialState: HomeData = {
  data: {},
  topScoringUserList: [],
  leagueMatchesList: [],
  topPickedPlayerList: [],
  topScoringPlayerList: [],
};

export default (state: HomeData = initialState, action: any): HomeData => {
  switch (action.type) {
    case GET_UPCOMING_MATCHES_LIST:
      return {
        ...state,
        leagueMatchesList: action.data,
      };
    case GET_MOST_SCORING_USER_LIST:
      return {
        ...state,
        topScoringUserList: action.data,
      };
    case GET_MOST_PICKED_PLAYER_LIST:
      return {
        ...state,
        topPickedPlayerList: action.data,
      };
    case GET_TOP_PERFORMING_PLAYER_LIST:
      return {
        ...state,
        topScoringPlayerList: action.data,
      };
    default:
      return state;
  }
};
