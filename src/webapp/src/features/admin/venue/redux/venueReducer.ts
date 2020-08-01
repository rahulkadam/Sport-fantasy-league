import {
  ACTION_START,
  CREATE_VENUE_ERROR,
  CREATE_VENUE,
  GET_VENUE_LIST,
  GET_VENUE_LIST_ERROR,
} from './venueConstants';

const initialState: Venue = {
  data: {},
  isLoading: false,
  hasError: false,
  statusMessage: '',
  venueList: [],
};

export default (state: Venue = initialState, action: any): Venue => {
  let venueState = {...state};
  switch (action.type) {
    case GET_VENUE_LIST:
      venueState = {
        ...state,
        venueList: action.venueList,
        isLoading: false,
      };
      return venueState;
    case ACTION_START:
      venueState = {
        ...state,
        isLoading: true,
        hasError: false,
        statusMessage: '',
      };
      return venueState;
    case GET_VENUE_LIST_ERROR:
      venueState = {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage:
          'Error Occured while performing action, please check your last action',
      };
      return venueState;
    case CREATE_VENUE:
      venueState = {
        ...state,
        statusMessage: action.message,
        isLoading: false,
      };
      return venueState;
    case CREATE_VENUE_ERROR:
      venueState = {
        ...state,
        isLoading: false,
        hasError: true,
        statusMessage: action.data,
      };
      return venueState;
    default:
      return state;
  }
};
