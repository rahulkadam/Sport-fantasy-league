import {useSelector} from 'react-redux';
import {RootState} from 'common/util';

export const getVenueData = () =>
  useSelector((state: RootState) => state.venueadmin);
