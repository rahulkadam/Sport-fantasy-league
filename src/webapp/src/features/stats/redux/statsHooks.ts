import {useSelector} from 'react-redux';
import {RootState} from 'common/util';

/**
 * Custom React Hook to get random.org API response from state.
 * @see https://reactjs.org/docs/hooks-custom.html
 */
const getStatsProps = () => useSelector((state: RootState) => state.stats);

export default getStatsProps;
