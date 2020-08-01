import {useSelector} from 'react-redux';
import {RootState} from 'common/util';

export const getPlayerData = () =>
  useSelector((state: RootState) => state.playeradmin);
