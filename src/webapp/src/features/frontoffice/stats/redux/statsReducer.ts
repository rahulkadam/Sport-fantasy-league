import {
  ACTION_START,
  ACTION_ERROR,
  FETCH_USER_STATS,
  FETCH_PLAYER_STATS,
  FETCH_MATCH_STATS,
} from './statsConstants';

const initialState: FantasyStats = {
  data: {},
  isLoading: false,
  hasError: false,
  statusMessage: '',
  shouldRefresh: false,
  tabName: 'overview',
  userStats: [],
  playerStats: [],
  matchStats: [],
};

export default (state: League = initialState, action: any): FantasyStats => {
  let fantasyStatsstate = {...state};
  switch (action.type) {
    case FETCH_USER_STATS:
      return {
        ...state,
        userStats: action.userStats,
        isLoading: false,
        hasError: false,
      };
    case FETCH_PLAYER_STATS:
      return {
        ...state,
        playerStats: action.playerStats,
        isLoading: false,
        hasError: false,
      };
    case FETCH_MATCH_STATS:
      return {
        ...state,
        matchStats: action.matchStats,
        isLoading: false,
        hasError: false,
      };
    case ACTION_START:
      fantasyStatsstate = {
        ...state,
        isLoading: true,
        hasError: false,
        shouldRefresh: false,
      };
      return fantasyStatsstate;
    case ACTION_ERROR:
      fantasyStatsstate = {
        ...state,
        isLoading: false,
        hasError: true,
        shouldRefresh: false,
        statusMessage: action.errorMessage,
      };
      return fantasyStatsstate;
    default:
      return fantasyStatsstate;
  }
};
