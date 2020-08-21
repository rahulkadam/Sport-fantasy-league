import {
  PROCESS_ACTION_COMPLETED,
  PROCESS_ACTION_ERROR,
  PROCESS_ACTION_START,
} from './processConstants';

const initialState: AdminProcess = {
  data: {},
  isLoading: false,
  hasError: false,
  statusMessage: '',
};

export default (
  state: AdminProcess = initialState,
  action: any
): AdminProcess => {
  let processState = {...state};
  switch (action.type) {
    case PROCESS_ACTION_START:
      processState = {
        ...state,
        isLoading: true,
        hasError: false,
        statusMessage: '',
      };
      return processState;
    case PROCESS_ACTION_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage: action.data,
      };
    case PROCESS_ACTION_COMPLETED:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        statusMessage: action.message,
      };
    default:
      return state;
  }
};
