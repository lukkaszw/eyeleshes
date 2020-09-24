import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import initialState from './initialState';

import userReducer from './reducers/user.reducer';
import clientsReducer from './reducers/clients.reducer';

const reducers = {
  user: userReducer,
  clients: clientsReducer,
};

Object.keys(initialState).forEach(item => {
  if (typeof reducers[item] === 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

const combinedReducers = combineReducers(reducers);

const additionalMiddlewares = process.env.NODE_ENV === 'production' ? applyMiddleware(thunk) : composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(
  combinedReducers, initialState,
  additionalMiddlewares,
);