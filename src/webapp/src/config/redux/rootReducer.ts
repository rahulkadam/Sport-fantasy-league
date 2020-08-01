import {combineReducers} from 'redux';
import {AuthenticationReducer} from 'features/Authentication/redux';
import storage from 'redux-persist/lib/storage';
import {connectRouter} from 'connected-react-router';
import leagueReducer from 'features/league/redux/leagueReducer';
import userteamReducer from 'features/UserTeam/redux/userteamReducer';
import tournamentReducer from 'features/admin/Tournament/redux/tournamentReducer';

const persistenceConfigs = {
  key: 'fantasysport',
  storage,
  whitelist: ['user'],
};

/**
 * Create root reducer, containing
 * all features of the application
 */
const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    user: AuthenticationReducer,
    league: leagueReducer,
    userteam: userteamReducer,
    tournament: tournamentReducer,
  });

export {rootReducer, persistenceConfigs};
