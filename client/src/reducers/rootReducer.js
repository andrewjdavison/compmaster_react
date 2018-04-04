import  { combineReducers } from 'redux';
import competitionList from './competitionReducer.js';
import auth from './authReducer.js';
import competitionDetail from './competitionDetailReducer.js';
import core from './coreReducer.js';

const appReducer = combineReducers({
  competitionList,
  competitionDetail,
  auth,
  core
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    console.log('Clearing Store');
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;
