import {combineReducers} from 'redux';
import {CounterReducer} from 'features/counter/redux';
import {RandomReducer} from 'features/random/redux';
import {AuthenticationReducer} from 'features/Authentication/redux';
import {BillViewReducer} from 'features/QuickPay/redux';
import storage from 'redux-persist/lib/storage';
import {connectRouter} from 'connected-react-router';

const persistenceConfigs = {
  key: 'apg',
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
    count: CounterReducer,
    random: RandomReducer,
    user: AuthenticationReducer,
    billview: BillViewReducer,
  });

export {rootReducer, persistenceConfigs};
