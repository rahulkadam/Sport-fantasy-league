import {useSelector} from 'react-redux';
import {RootState} from 'common/util';

export const getMatchData = () =>
  useSelector((state: RootState) => state.matchadmin);
