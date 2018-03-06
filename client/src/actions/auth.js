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


export function authenticateUser(event){
  event.preventDefault();

  return (dispatch, getState) => {
    const state = getState();
    dispatch(authenticating(true));
    dispatch(authenticated(false));

    console.log(state);
    console.log('email: ',  state.auth.authRequest.username);
    console.log('password', state.auth.authRequest.password);
  };
}

