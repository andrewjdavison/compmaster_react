import {post} from '../coreutil.js';

export function authenticationHasErrored(bool){
  return {
    type: 'AUTHENTICATION_HAS_ERRORED',
    hasErrored: bool
  };
}

export function authenticating(bool){
  return {
    type: 'AUTHENTICATING',
    isLoading: true
  };
}

export function errorMsg(code, msg){
  return {
    type: 'ERROR',
    summary:msg
  };
}

export function authenticated(bool){
  return {
    type: 'AUTHENTICATED',
    authenticated: bool
  };
}

export function authenticationSuccess(user){
  return {
    type: 'AUTHENTICATION_SUCCESS',
    user
  };
}

export function setUsername(username){
  console.log('Setting Username');
  return {
    type: 'SET_USERNAME',
    username
  };
};

export function setPassword(password){
  return {
    type: 'SET_PASSWORD',
    password
  };
};

export function setToken(token){
  return {
    type: 'SET_TOKEN',
    token
  };
};

export function setUser(user){
  return {
    type: 'SET_USER',
    user
  };
};

export function resetAuth(data){
  return {
    type: 'RESET_AUTH',
  };
};




export function authenticateUser(data){

  console.log(JSON.stringify(data));
  return (dispatch, getState) => {
    const state = getState();
    dispatch(authenticating(true));
    dispatch(authenticated(false));

    post('/auth',data)
    .then((response)=>{
      if(response.error===undefined){
        dispatch(setUser(response.body.user));
        dispatch(setToken(response.body.token));
        dispatch(authenticated(true));
        dispatch(resetAuth());

        window.location = state.core.currentPage;


      } else {
        if(response.error.code ===401){
          dispatch(authenticated(false));
          dispatch(errorMsg(response.error, "The username or password provided is not correct"));
        } else {
          dispatch(authenticated(false));
          dispatch(errorMsg(response.error,'There was a server error. Please try again shortly'));
        }
      }
    });
  };
}

