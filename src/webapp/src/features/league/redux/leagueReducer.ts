import {
  ACTION_START,
  ACTION_ERROR,
  GET_USER_LEAGUE,
  GET_PUBLIC_LEAGUE_LIST,
  JOIN_LEAGUE,
  JOIN_LEAGUE_ERROR,
  CREATE_LEAGUE,
  CREATE_LEAGUE_ERROR,
  CLEAR_STATUS_MESSAGE,
} from './leagueConstants';

const initialState: League = {
  data: {userleagueList: []},
  isLoading: false,
  hasError: false,
  statusMessage: '',
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
        isLoading: false,
        shouldRefresh: false,
        tabName: 'overview',
      };
      return userLeaguestate;
    case JOIN_LEAGUE:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        statusMessage: 'League Joined Succesfully, PLease refresh Page',
        shouldRefresh: true,
        tabName: 'overview',
      };
    case CREATE_LEAGUE:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        shouldRefresh: true,
        tabName: 'overview',
        statusMessage: 'League Created Succesfully, Please refresh Page',
      };
    case ACTION_START:
      userLeaguestate = {
        ...state,
        isLoading: true,
        hasError: false,
        shouldRefresh: false,
      };
      return userLeaguestate;
    case ACTION_ERROR:
      userLeaguestate = {
        ...state,
        isLoading: false,
        hasError: true,
        shouldRefresh: false,
        statusMessage:
          'Error Occured while performing action, please check your last action',
      };
      return userLeaguestate;
    case JOIN_LEAGUE_ERROR:
      userLeaguestate = {
        ...state,
        isLoading: false,
        hasError: true,
        shouldRefresh: false,
        statusMessage: 'Error Occured while Joining League, please check code',
      };
      return userLeaguestate;
    case CREATE_LEAGUE_ERROR:
      userLeaguestate = {
        ...state,
        isLoading: false,
        hasError: true,
        shouldRefresh: false,
        statusMessage:
          'Error Occured while Creating League, please check/refresh again',
      };
      return userLeaguestate;
    default:
      return state;
  }
};
