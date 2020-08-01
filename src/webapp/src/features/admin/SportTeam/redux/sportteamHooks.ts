import {useSelector} from 'react-redux';
import {RootState} from 'common/util';

export const getTeamData = () =>
  useSelector((state: RootState) => state.sportteam);
