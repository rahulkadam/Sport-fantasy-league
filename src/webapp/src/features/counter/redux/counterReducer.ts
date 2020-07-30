import {INCREMENT_COUNTER, CLEAR_COUNTER} from './counterConstants';

const initialState: Count = {
  value: 0,
  value1: 100,
};

export default (state: Count = initialState, action: any): Count => {
  let countObj: Count;
  switch (action.type) {
    case INCREMENT_COUNTER:
      countObj = action.value;
      return {...state, ...countObj};
    case CLEAR_COUNTER:
      return {...state, ...initialState};
    default:
      return state;
  }
};
