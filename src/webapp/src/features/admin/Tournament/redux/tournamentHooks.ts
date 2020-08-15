import {useSelector} from 'react-redux';
import {RootState} from 'common/util';

export const getTournamentData = () =>
  useSelector((state: RootState) => {
    return state.tournament;
  });
