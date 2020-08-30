import {
  PROCESS_ACTION_COMPLETED,
  PROCESS_ACTION_ERROR,
  PROCESS_ACTION_START,
  PROCESS_FETCH_NOTICE_LIST,
} from './processConstants';

const initialState: AdminProcess = {
  data: {},
  isLoading: false,
  hasError: false,
  statusMessage: '',
  notice: [],
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
    case PROCESS_FETCH_NOTICE_LIST:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        notice: action.data,
      };
    default:
      return state;
  }
};
