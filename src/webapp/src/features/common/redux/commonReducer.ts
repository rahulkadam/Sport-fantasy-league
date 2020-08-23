import {ACTION_START, ACTION_ERROR, ACTION_COMPLETED} from './commonConstants';

const initialState: CommonConfigData = {
  data: {},
  isLoading: false,
  hasError: false,
  statusMessage: '',
};

export default (
  state: CommonConfigData = initialState,
  action: any
): CommonConfigData => {
  switch (action.type) {
    case ACTION_START:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case ACTION_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage: action.errorMessage,
      };
    case ACTION_COMPLETED:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
