import {useSelector} from 'react-redux';
import {RootState} from 'common/util';

export const getCounterStoreData = () =>
  useSelector((state: RootState) => {
    if (state && state.count) {
      return state.count;
    }
    return {value: '234', value1: '234'};
  });
