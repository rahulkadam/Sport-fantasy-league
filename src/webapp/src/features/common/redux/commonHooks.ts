import {useSelector} from 'react-redux';
import {RootState} from 'common/util';

/**
 * Custom React Hook to get random.org API response from state.
 * @see https://reactjs.org/docs/hooks-custom.html
 */
const getCommonData = () =>
  useSelector((state: RootState) => state.commonconfig);

export default getCommonData;
