import {
  createStore,
  applyMiddleware
} from 'redux'

import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer.js';

export function configureStore(){
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
};


export const store = configureStore();
