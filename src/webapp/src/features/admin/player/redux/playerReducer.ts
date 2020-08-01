import {
  ACTION_START,
  CREATE_PLAYER_ERROR,
  CREATE_PLAYER,
  GET_PLAYER_LIST,
  GET_PLAYER_LIST_ERROR,
} from './playerConstants';

const initialState: Player = {
  data: {},
  isLoading: false,
  hasError: false,
  statusMessage: '',
  playerList: [],
};

export default (state: Player = initialState, action: any): Player => {
  let playerState = {...state};
  switch (action.type) {
    case GET_PLAYER_LIST:
      playerState = {
        ...state,
        playerList: action.playerList,
        isLoading: false,
      };
      return playerState;
    case ACTION_START:
      playerState = {
        ...state,
        isLoading: true,
        hasError: false,
        statusMessage: '',
      };
      return playerState;
    case GET_PLAYER_LIST_ERROR:
      playerState = {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage:
          'Error Occured while performing action, please check your last action',
      };
      return playerState;
    case CREATE_PLAYER:
      playerState = {
        ...state,
        statusMessage: action.message,
        isLoading: false,
      };
      return playerState;
    case CREATE_PLAYER_ERROR:
      playerState = {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage: action.data,
      };
      return playerState;
    default:
      return state;
  }
};
