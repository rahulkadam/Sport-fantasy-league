import {
  FETCH_LIVE_MATCHES_LIST,
  FETCH_PLAYER_SCORE_BY_LIVE_MATCHES,
  FETCH_USER_TEAM_FOR_LIVE_MATCH,
} from './matchliveConstants';

const initialState: MatchLiveStats = {
  data: {},
  userStats: [],
  playerStats: [],
  matchStats: [],
  livematches: [],
  matchScore: {},
  userLiveTeam: {},
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
    case FETCH_USER_TEAM_FOR_LIVE_MATCH:
      return {
        ...state,
        userLiveTeam: action.userLiveTeam,
      };
    case FETCH_PLAYER_SCORE_BY_LIVE_MATCHES:
      return {
        ...state,
        playerStats: action.livedata.playerScoreDTOS,
        matchScore: action.livedata.matchDTO,
      };
    default:
      return state;
  }
};
