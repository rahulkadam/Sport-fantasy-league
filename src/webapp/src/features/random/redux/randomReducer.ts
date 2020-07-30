import {
  GET_RANDOM_NUMBER,
  GET_RANDOM_NUMBER_PENDING,
  GET_RANDOM_NUMBER_REJECTED,
} from './randomConstants';

const initialState: Random = {
  number: 100,
  isLoading: false,
  hasError: false,
  isFulfilled: false,
};

export default (state: Random = initialState, action: any): Random => {
  switch (action.type) {
    case GET_RANDOM_NUMBER:
      return {
        isFulfilled: true,
        isLoading: false,
        hasError: false,
        number: action.payload,
      };
    case GET_RANDOM_NUMBER_PENDING:
      return {
        ...state,
        isFulfilled: false,
        isLoading: true,
        hasError: false,
      };
    case GET_RANDOM_NUMBER_REJECTED:
      return {
        isFulfilled: false,
        isLoading: false,
        hasError: true,
        number: 100,
      };

    default:
      return state;
  }
};
