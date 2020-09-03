import {
  GET_MOST_SCORING_USER_LIST,
  GET_MOST_PICKED_PLAYER_LIST,
  GET_TOP_PERFORMING_PLAYER_LIST,
  GET_UPCOMING_MATCHES_LIST,
  FETCH_PUBLIC_LEAGUE,
  FETCH_DASHBOARD_DATA,
  GET_FANTASY_NOTICE,
  GET_UPCOMING_ALL_MATCHES_LIST,
} from './homeConstants';

const initialState: HomeData = {
  data: {},
  topScoringUserList: [],
  leagueMatchesList: [],
  topPickedPlayerList: [],
  topScoringPlayerList: [],
  publicLeagueList: [],
  dashboard: {},
  notice: {},
  leagueAllMatchesList: [],
};

export default (state: HomeData = initialState, action: any): HomeData => {
  switch (action.type) {
    case GET_UPCOMING_MATCHES_LIST:
      return {
        ...state,
        leagueMatchesList: action.data,
      };
    case GET_UPCOMING_ALL_MATCHES_LIST:
      return {
        ...state,
        leagueAllMatchesList: action.data,
      };
    case GET_MOST_SCORING_USER_LIST:
      return {
        ...state,
        topScoringUserList: action.data,
      };
    case GET_FANTASY_NOTICE:
      return {
        ...state,
        notice: action.data,
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
    case FETCH_PUBLIC_LEAGUE:
      return {
        ...state,
        publicLeagueList: action.data,
      };
    case FETCH_DASHBOARD_DATA:
      return {
        ...state,
        dashboard: action.data,
      };
    default:
      return state;
  }
};
