import {useSelector} from 'react-redux';
import {RootState} from 'common/util';

export const getTournamentData = () =>
  useSelector((state: RootState) => {
    console.log(state.tournament);
    return state.tournament;
  });
