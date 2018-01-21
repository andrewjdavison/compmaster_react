import {
  combineReducers,
  createStore,
  applyMiddleware
} from 'redux'

import thunk from 'redux-thunk';

import competitionReducer from './reducers/competitionReducer.js';

// actions.js

export const loadCompetitionList = () => ({
  type: 'LOAD_COMPETITION_LIST',
});

export const loadCompetitionDetails = id => ({
  type: 'LOAD_COMPETITION_DETAILS',
  id,
});

export const reducers = combineReducers({
  competitionReducer,
});

//store.js

export function configureStore(){
  const store = createStore(reducers, undefined, applyMiddleware(thunk));
  return store;
};


export const store = configureStore();
