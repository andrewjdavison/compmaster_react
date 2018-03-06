import  { combineReducers } from 'redux';
import competitionList from './competitionReducer.js';
import auth from './authReducer.js';
import competitionDetail from './competitionDetailReducer.js';

const appReducer = combineReducers({
  competitionList,
  competitionDetail,
  auth
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    console.log('Clearing Store');
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;
