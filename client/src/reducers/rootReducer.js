import  { combineReducers } from 'redux';
import competitionList from './competitionReducer.js';

const rootReducer = combineReducers({
  competitionList
});

export default rootReducer;
