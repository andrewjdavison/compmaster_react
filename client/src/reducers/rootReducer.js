import  { combineReducers } from 'redux';
import competitionList from './competitionReducer.js';
import auth from './authReducer.js';

const rootReducer = combineReducers({
  competitionList,
  auth
});

export default rootReducer;
