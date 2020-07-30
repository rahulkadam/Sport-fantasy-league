import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {rootReducer, persistenceConfigs} from './rootReducer';
import React from 'react';
import {routerMiddleware, ConnectedRouter} from 'connected-react-router';
import history from '../../common/config/history';

const persistedReducer = persistReducer(
  persistenceConfigs,
  rootReducer(history)
);

const router = routerMiddleware(history);
const middlewares = [thunk, router];

/**
 * Initialize Redux Dev Tools,
 * if they are installed in browser.
 */
/** Use Redux compose, if browser doesn't have Redux devtools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/** Create Redux store with root reducer and middleware included */
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export const persistedStore = persistStore(store);

const reduxStore = ({
  store,
  persistedStore,
  Provider,
}) => WrappedComponent => props => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <ConnectedRouter history={history}>
        <WrappedComponent {...props} />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

/**
 * Create HOC, which wraps given Component with Redux Provider
 */
export default reduxStore({store, persistedStore, Provider});
