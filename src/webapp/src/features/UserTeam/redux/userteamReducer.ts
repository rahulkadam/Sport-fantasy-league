import {
  ACTION_START,
  ACTION_ERROR,
  FETCH_ALL_PLAYER_LIST,
  FETCH_ALL_PLAYER_LIST_ERROR,
  FETCH_PLAYER_LIST_BY_USER,
  FETCH_PLAYER_LIST_BY_USER_ERROR,
  UPDATE_INTERNAL_USER_TEAM,
  FETCH_USER_TEAM,
  FETCH_USER_TEAM_ERROR,
  SAVE_USER_TEAM,
  SAVE_USER_TEAM_ERROR,
  REMOVE_FROM_INTERNAL_USER_TEAM,
} from './userteamConstants';
import {
  findCountDifferenceInList,
  returnMapFromList,
  returnUniqueArrayElement,
} from 'common/util';

const initialState: UserTeam = {
  data: {playerList: []},
  isLoading: false,
  hasError: false,
  statusMessage: '',
  playerList: [],
  userTeamPlayers: [],
  currentUserTeamPlayers: [],
  userteam: {},
  currentUserTeamValue: 0,
  currentTransferChanges: 0,
};

export default (state: UserTeam = initialState, action: any): UserTeam => {
  let userLeaguestate = {...state};
  let currentTeamValue = 0;
  let currentUserTeamPlayers = state.currentUserTeamPlayers;
  let transferCount = state.currentTransferChanges;
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
        currentUserTeamPlayers: action.userTeamPlayers,
        currentTransferChanges: 0,
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
    case UPDATE_INTERNAL_USER_TEAM:
      const rowMap = returnMapFromList(action.rows);
      currentUserTeamPlayers = state.currentUserTeamPlayers.concat(action.rows);
      currentUserTeamPlayers = returnUniqueArrayElement(currentUserTeamPlayers);
      currentUserTeamPlayers = currentUserTeamPlayers.map((player: any) => {
        if (rowMap.get(player.id)) {
          return {...player, isNew: true};
        }
        return player;
      });

      currentUserTeamPlayers.forEach(
        (player: any) => (currentTeamValue = currentTeamValue + player.value)
      );
      currentTeamValue = state.userteam.totalbalance - currentTeamValue;
      transferCount = findCountDifferenceInList(
        state.userTeamPlayers,
        currentUserTeamPlayers
      );
      userLeaguestate = {
        ...state,
        currentUserTeamPlayers: currentUserTeamPlayers,
        currentUserTeamValue: currentTeamValue,
        currentTransferChanges: transferCount,
        isLoading: false,
      };
      return userLeaguestate;
    case REMOVE_FROM_INTERNAL_USER_TEAM:
      currentUserTeamPlayers = currentUserTeamPlayers.filter(
        (player: any) => player.id != action.rows.id
      );
      currentUserTeamPlayers.forEach(
        (player: any) => (currentTeamValue = currentTeamValue + player.value)
      );
      currentTeamValue = state.userteam.totalbalance - currentTeamValue;
      transferCount = findCountDifferenceInList(
        state.userTeamPlayers,
        currentUserTeamPlayers
      );

      userLeaguestate = {
        ...state,
        currentUserTeamPlayers: currentUserTeamPlayers,
        currentUserTeamValue: currentTeamValue,
        currentTransferChanges: transferCount,
        isLoading: false,
      };
      return userLeaguestate;
    case FETCH_USER_TEAM:
      userLeaguestate = {
        ...state,
        userteam: action.userteam[0],
        currentUserTeamValue: action.userteam[0].creditbalance,
        isLoading: false,
      };
      return userLeaguestate;
    case FETCH_USER_TEAM_ERROR:
      userLeaguestate = {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage:
          'Error Occured while fetching your User team, please try again',
      };
      return userLeaguestate;
    case SAVE_USER_TEAM:
      userLeaguestate = {
        ...state,
        statusMessage:
          'Team Created Successfully, Please refresh to add player',
        isLoading: false,
      };
      return userLeaguestate;
    case SAVE_USER_TEAM_ERROR:
      userLeaguestate = {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage: action.data,
      };
      return userLeaguestate;
    default:
      return state;
  }
};
