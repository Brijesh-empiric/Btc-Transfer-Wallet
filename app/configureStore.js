/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import jwtDecode from 'jwt-decode';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'connected-react-router/immutable';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import globalSagas from 'containers/App/saga';

const sagaMiddleware = createSagaMiddleware();

const tokenExpiration = store => next => action => {
  try {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    if (token && decoded.exp < Date.now() / 1000) {
      next(action);
      // localStorage.clear();
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      action.type = 'APP/App/SHOW_TOKEN_INVALID_MESSAGE';
    }
    next(action);
  } catch(e) {
    // localStorage.clear();
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    next(action);
  }
};

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [ sagaMiddleware, routerMiddleware(history), tokenExpiration ];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  // Extensions
  sagaMiddleware.run(globalSagas);
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      import('./reducers').then(reducerModule => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.injectedReducers);

        store.replaceReducer(nextReducers);
      });
      // store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
