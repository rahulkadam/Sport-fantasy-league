import {
  ACTION_START,
  ACTION_ERROR,
  GET_USER_LEAGUE,
  GET_PUBLIC_LEAGUE_LIST,
  JOIN_LEAGUE,
  JOIN_LEAGUE_ERROR,
} from './leagueConstants';

const initialState: League = {
  data: {userleagueList: []},
  isLoading: false,
  hasError: false,
  statusMessage: '',
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
        isLoading: false,
      };
      return userLeaguestate;
    case JOIN_LEAGUE:
      return userLeaguestate;
    case ACTION_START:
      userLeaguestate = {
        ...state,
        isLoading: true,
        hasError: false,
        statusMessage: '',
      };
      return userLeaguestate;
    case ACTION_ERROR:
      userLeaguestate = {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage:
          'Error Occured while performing action, please check your last action',
      };
      return userLeaguestate;
    case JOIN_LEAGUE_ERROR:
      userLeaguestate = {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage: 'Error Occured while creating League',
      };
      return userLeaguestate;
    default:
      return state;
  }
};
