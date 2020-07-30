import {useSelector} from 'react-redux';
import {RootState} from 'common/util';

/**
 * Custom React Hook to get count value from state.
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const GetLoginStoreData = () =>
  useSelector((state: RootState) => {
    if (state) {
      return state.user;
    }
    return {};
  });
