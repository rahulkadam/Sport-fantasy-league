import {
  ACTION_START,
  ACTION_ERROR,
  GET_USER_LEAGUE,
  GET_PUBLIC_LEAGUE_LIST,
} from './leagueConstants';

const initialState: League = {
  data: {key: 'keyyyy'},
  isLoading: false,
  hasError: false,
  isFulfilled: false,
};

export default (state: League = initialState, action: any): League => {
  switch (action.type) {
    case GET_PUBLIC_LEAGUE_LIST:
      return {
        isFulfilled: true,
        isLoading: false,
        hasError: false,
        data: action.data,
      };
    case GET_USER_LEAGUE:
      return {
        isFulfilled: true,
        isLoading: false,
        hasError: false,
        data: {...state.data, userleagueList: action.userleagueList},
      };
    case ACTION_START:
      return {
        ...state,
        isFulfilled: false,
        isLoading: true,
        hasError: false,
        data: action.data,
      };
    case ACTION_ERROR:
      return {
        isFulfilled: false,
        isLoading: false,
        hasError: true,
        data: action.data,
      };

    default:
      return state;
  }
};
