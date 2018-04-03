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


function post(url, data){
  let postResponse={
    body: undefined,
    error:undefined,
  };

  let headers = new Headers();

  headers.append('Accept', 'application/json');
  headers.append('Content-Type','application/json');

  let config={
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  };

  return fetch(url, config)
    .then((response) => {
      if(response.status != 200){
        throw new Error(response.status);
      }
      postResponse.body = response.json();
      return postResponse;
    })
  .catch((error)=>{
    console.log('error');
    if(error.message==401){
      postResponse.error={
        code:401,
        summary:'Unauthorised'
      };
    }
    else {
      postResponse.error={
        code: error.message
      };
    }

    return postResponse;
  });
};


export function authenticateUser(data){

  console.log(JSON.stringify(data));
  return (dispatch, getState) => {
    const state = getState();
    dispatch(authenticating(true));
    dispatch(authenticated(false));

    post('/auth',data)
    .then((response)=>{
      if(response.error==undefined){
        dispatch(setToken(response.token));
        dispatch(authenticated(true));
      } else {
        if(response.error.code ===401){
          dispatch(errorMsg(response.error, "The username or password provided is not correct"));
        } else {
          dispatch(errorMsg(response.error,'There was a server error. Please try again shortly'));
        }
      }
    });
  };
}

