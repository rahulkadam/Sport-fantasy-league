import {useSelector} from 'react-redux';
import {RootState} from 'common/util';

export const getUserTeamData = () =>
  useSelector((state: RootState) => state.userteam);
