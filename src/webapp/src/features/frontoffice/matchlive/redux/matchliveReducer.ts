import {
  FETCH_LIVE_MATCHES_LIST,
  FETCH_PLAYER_SCORE_BY_LIVE_MATCHES,
} from './matchliveConstants';

const initialState: MatchLiveStats = {
  data: {},
  userStats: [],
  playerStats: [],
  matchStats: [],
  livematches: [],
};

export default (
  state: MatchLiveStats = initialState,
  action: any
): MatchLiveStats => {
  switch (action.type) {
    case FETCH_LIVE_MATCHES_LIST:
      return {
        ...state,
        livematches: action.livematches,
      };
    case FETCH_PLAYER_SCORE_BY_LIVE_MATCHES:
      return {
        ...state,
        playerStats: action.playerStats,
      };
    default:
      return state;
  }
};
