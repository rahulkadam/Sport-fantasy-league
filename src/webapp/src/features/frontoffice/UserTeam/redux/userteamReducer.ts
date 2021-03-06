import {
  FETCH_ALL_PLAYER_LIST,
  UPDATE_INTERNAL_USER_TEAM,
  SAVE_USER_TEAM,
  REMOVE_FROM_INTERNAL_USER_TEAM,
  FETCH_GAME_CRITERIA,
  RESET_INTERNAL_USER_TEAM,
  UPDATE_CAPTION_FOR_TEAM,
  AUTO_PICK_USER_TEAM,
  SHOULD_REFRESH_STOP,
  FETCH_USER_TEAM_WITH_PLAYERS,
  USER_TEAM_ACTION_START,
  USER_TEAM_ACTION_STOP,
} from './userteamConstants';
import {
  findCountDifferenceInList,
  getAutoPickTeam,
  isListEmpty,
  returnMapFromList,
  returnUniqueArrayElement,
} from 'common/util';

const initialState: UserTeam = {
  data: {playerList: []},
  playerList: [],
  userTeamPlayers: [],
  currentUserTeamPlayers: [],
  userteam: {},
  currentUserTeamValue: 0,
  currentTransferChanges: 0,
  teamcriteria: {},
  shouldRefresh: false,
  captionPlayerId: 0,
  captainName: '',
  isUserTeamLoading: false,
};

export default (state: UserTeam = initialState, action: any): UserTeam => {
  let userLeaguestate = {...state};
  let currentTeamValue = 0;
  let currentUserTeamPlayers = state.currentUserTeamPlayers;
  let transferCount = state.currentTransferChanges;
  let captionPlayerId = state.captionPlayerId;
  switch (action.type) {
    case FETCH_USER_TEAM_WITH_PLAYERS:
      const actionUserTeam = action.userteam;
      if (actionUserTeam.name) {
        userLeaguestate = {
          ...state,
          userTeamPlayers: actionUserTeam.teamPlayersPlayerDTOList,
          currentUserTeamPlayers: actionUserTeam.teamPlayersPlayerDTOList,
          currentTransferChanges: 0,
          userteam: actionUserTeam,
          currentUserTeamValue: actionUserTeam.creditbalance,
          captionPlayerId: actionUserTeam.team_captain_player_Id,
          captainName: actionUserTeam.captainName,
          isUserTeamLoading: false,
        };
      }
      return {...userLeaguestate, isUserTeamLoading: false};
    case FETCH_ALL_PLAYER_LIST:
      userLeaguestate = {
        ...state,
        playerList: action.playerList,
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
      captionPlayerId = state.captionPlayerId || currentUserTeamPlayers[0].id;
      userLeaguestate = {
        ...state,
        currentUserTeamPlayers: currentUserTeamPlayers,
        currentUserTeamValue: currentTeamValue,
        currentTransferChanges: transferCount,
        captionPlayerId: captionPlayerId,
      };
      return userLeaguestate;

    case AUTO_PICK_USER_TEAM:
      currentUserTeamPlayers = getAutoPickTeam(state.playerList);
      captionPlayerId = state.captionPlayerId || currentUserTeamPlayers[0].id;
      userLeaguestate = {
        ...state,
        currentUserTeamPlayers: currentUserTeamPlayers,
        captionPlayerId: captionPlayerId,
      };
      return userLeaguestate;
    case REMOVE_FROM_INTERNAL_USER_TEAM:
      currentUserTeamPlayers = currentUserTeamPlayers.filter(
        (player: any) => player.id != action.rows.id
      );
      const captionSearch = currentUserTeamPlayers.filter(
        (player: any) => player.id == captionPlayerId
      );
      if (isListEmpty(captionSearch)) {
        captionPlayerId = currentUserTeamPlayers[0].id;
      }
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
        captionPlayerId: captionPlayerId,
      };
      return userLeaguestate;
    case SHOULD_REFRESH_STOP:
      return {
        ...state,
        shouldRefresh: false,
      };
    case SAVE_USER_TEAM:
      userLeaguestate = {
        ...state,
        shouldRefresh: true,
      };
      return userLeaguestate;
    case USER_TEAM_ACTION_START:
      userLeaguestate = {
        ...state,
        isUserTeamLoading: true,
      };
      return userLeaguestate;
    case USER_TEAM_ACTION_STOP:
      userLeaguestate = {
        ...state,
        isUserTeamLoading: false,
      };
      return userLeaguestate;
    case FETCH_GAME_CRITERIA:
      userLeaguestate = {
        ...state,
        teamcriteria: action.gameCriteria,
      };
      return userLeaguestate;
    case UPDATE_CAPTION_FOR_TEAM:
      userLeaguestate = {
        ...state,
        captionPlayerId: action.captainId,
      };
      return userLeaguestate;
    case RESET_INTERNAL_USER_TEAM:
      return {
        ...state,
        currentUserTeamPlayers: state.userTeamPlayers,
        currentUserTeamValue: state.userteam.creditbalance,
        captionPlayerId: state.userteam.team_captain_player_Id,
        currentTransferChanges: 0,
      };
    default:
      return state;
  }
};
