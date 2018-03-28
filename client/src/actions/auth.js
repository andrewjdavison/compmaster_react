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

    let headers = new Headers();

    headers.append('Accept', 'application/json');
    headers.append('Content-Type','application/json');

    let formData = new FormData();
    formData.append("json", JSON.stringify(data));

    console.log('Transmitting request');

    fetch('/auth',{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then((response) => {
      console.log(response);
      if(response.status!=200){
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((responseData)=> {
      dispatch(setToken(responseData.token));
      dispatch(authenticated(true));
//      dispatch(authenticating(false));
      console.log(responseData);
      console.log(state);
      console.log('email: ',  state.auth.authRequest.username);
      console.log('password', state.auth.authRequest.password);
    })
    .catch((error)=>{
      console.log(error);
      if(error.message==401){
        dispatch(errorMsg(error,'The username or password provided is not correct.'));
      } else {
        dispatch(errorMsg(error,'There was a server error. Please try again shortly'));
      }
    });

  };
}

