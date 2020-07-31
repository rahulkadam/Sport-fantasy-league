import {
  ACTION_START,
  ACTION_ERROR,
  FETCH_ALL_PLAYER_LIST,
  FETCH_ALL_PLAYER_LIST_ERROR,
  FETCH_PLAYER_LIST_BY_USER,
  FETCH_PLAYER_LIST_BY_USER_ERROR,
} from './userteamConstants';

const initialState: UserTeam = {
  data: {playerList: []},
  isLoading: false,
  hasError: false,
  statusMessage: '',
  playerList: [],
  userTeamPlayers: [],
};

export default (state: UserTeam = initialState, action: any): UserTeam => {
  let userLeaguestate = {...state};
  switch (action.type) {
    case FETCH_ALL_PLAYER_LIST:
      userLeaguestate = {
        ...state,
        playerList: action.playerList,
        isLoading: false,
      };
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
    case FETCH_ALL_PLAYER_LIST_ERROR:
      userLeaguestate = {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage:
          'Error Occured while fetching Player List, please try again',
      };
      return userLeaguestate;
    case FETCH_PLAYER_LIST_BY_USER:
      userLeaguestate = {
        ...state,
        userTeamPlayers: action.userTeamPlayers,
        isLoading: false,
      };
      return userLeaguestate;
    case FETCH_PLAYER_LIST_BY_USER_ERROR:
      userLeaguestate = {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage:
          'Error Occured while fetching your team, please try again',
      };
      return userLeaguestate;
    default:
      return state;
  }
};
