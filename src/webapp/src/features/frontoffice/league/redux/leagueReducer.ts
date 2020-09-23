import {
  GET_USER_LEAGUE,
  GET_PUBLIC_LEAGUE_LIST,
  JOIN_LEAGUE,
  CREATE_LEAGUE,
  FETCH_PLAYER_LIST_BY_USER_IN_LEAGUE,
} from './leagueConstants';

const initialState: League = {
  data: {userleagueList: []},
  shouldRefresh: false,
  tabName: 'overview',
};

export default (state: League = initialState, action: any): League => {
  let userLeaguestate = {...state};
  switch (action.type) {
    case GET_PUBLIC_LEAGUE_LIST:
      return userLeaguestate;
    case GET_USER_LEAGUE:
      const data = {...state.data, userleagueList: action.userleagueList};
      userLeaguestate = {
        ...state,
        data: data,
        shouldRefresh: false,
        tabName: 'overview',
      };
      return userLeaguestate;
    case JOIN_LEAGUE:
      return {
        ...state,
        shouldRefresh: true,
        tabName: 'overview',
      };
    case CREATE_LEAGUE:
      return {
        ...state,
        shouldRefresh: true,
        tabName: 'overview',
      };
    case FETCH_PLAYER_LIST_BY_USER_IN_LEAGUE:
      return {
        ...state,
        leagueMemberTeam: action.userTeam,
      };
    default:
      return state;
  }
};
