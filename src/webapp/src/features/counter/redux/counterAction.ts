import {useDispatch} from 'react-redux';
import {INCREMENT_COUNTER, CLEAR_COUNTER} from './counterConstants';
import {dispatchActionWrapper} from 'common/util';

const incrementCounterAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(dispatch, (count: any) => {
    dispatch({
      type: INCREMENT_COUNTER,
      value: {value: count.value + 1, value1: count.value1 - 1},
    });
  });
};

const clearCounterAction = () => {
  const dispatch = useDispatch();
  return dispatchActionWrapper(dispatch, () => {
    dispatch({
      type: CLEAR_COUNTER,
      value: {value: 0, value1: 100},
    });
  });
};

export {incrementCounterAction, clearCounterAction};
