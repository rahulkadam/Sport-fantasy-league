import {combineReducers} from 'redux';
import {AuthenticationReducer} from 'features/Authentication/redux';
import storage from 'redux-persist/lib/storage';
import {connectRouter} from 'connected-react-router';
import leagueReducer from 'features/frontoffice/league/redux/leagueReducer';
import userteamReducer from 'features/frontoffice/UserTeam/redux/userteamReducer';
import tournamentReducer from 'features/admin/Tournament/redux/tournamentReducer';
import sportteamReducer from 'features/admin/SportTeam/redux/sportteamReducer';
import playerReducer from 'features/admin/player/redux/playerReducer';
import venueReducer from 'features/admin/venue/redux/venueReducer';
import {matchReducer} from 'features/admin/Match/redux';
import {homeReducer} from 'features/frontoffice/home/redux';
import statsReducer from 'features/frontoffice/stats/redux/statsReducer';
import {processReducer} from 'features/admin/process/redux';
import {commonReducer} from 'features/common/redux';
import {livematchReducer} from 'features/frontoffice/matchlive/redux';

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
    sportteam: sportteamReducer,
    playeradmin: playerReducer,
    venueadmin: venueReducer,
    processadmin: processReducer,
    matchadmin: matchReducer,
    homedata: homeReducer,
    fantasystats: statsReducer,
    commonconfig: commonReducer,
    livematchstats: livematchReducer,
  });

export {rootReducer, persistenceConfigs};
