import {
  FETCH_USER_STATS,
  FETCH_PLAYER_STATS,
  FETCH_MATCH_STATS,
} from './statsConstants';

const initialState: FantasyStats = {
  data: {},
  userStats: [],
  playerStats: [],
  matchStats: [],
};

export default (
  state: FantasyStats = initialState,
  action: any
): FantasyStats => {
  switch (action.type) {
    case FETCH_USER_STATS:
      return {
        ...state,
        userStats: action.userStats,
      };
    case FETCH_PLAYER_STATS:
      return {
        ...state,
        playerStats: action.playerStats,
      };
    case FETCH_MATCH_STATS:
      return {
        ...state,
        matchStats: action.matchStats,
      };
    default:
      return state;
  }
};
