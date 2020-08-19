import {useSelector} from 'react-redux';
import {RootState} from 'common/util';

/**
 * Custom React Hook to get random.org API response from state.
 * @see https://reactjs.org/docs/hooks-custom.html
 */
const getLeagueData = () => useSelector((state: RootState) => state.league);

export default getLeagueData;
