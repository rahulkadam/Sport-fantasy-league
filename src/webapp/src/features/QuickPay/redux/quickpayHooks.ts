import {useSelector} from 'react-redux';
import {RootState} from 'common/util';

/**
 * Custom React Hook to get Billview  from store.
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const GetQuickPayStoreData = () =>
  useSelector((state: RootState) => {
    if (state && state.billview) {
      return state.billview;
    }
    return {};
  });
