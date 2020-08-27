import {FETCH_LIVE_MATCHES_LIST} from './matchliveConstants';

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
    default:
      return state;
  }
};
