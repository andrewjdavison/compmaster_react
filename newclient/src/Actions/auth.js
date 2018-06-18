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

export function signout(){
  return {
    type: 'SIGNOUT'
  }
}

export function createUserSent(){
  return {
    type: 'CREATEUSERSENT'
  }
}




export function authenticateUser(data){

  console.log('Authentication Data',JSON.stringify(data));
  return (dispatch, getState) => {
    const state = getState();
    dispatch(authenticating(true));

    post('/auth',data)
    .then((response)=>{
      console.log('Response',response);
      if(response.error===undefined){
        console.log('response.error was undefined')
        dispatch(setUser(response.body.user));
        dispatch(setToken(response.body.token));
        dispatch(authenticated(true));

        var destPage = state.core.currentPage;

        if(destPage === undefined || destPage === ''){
          destPage = '/home';
        }
        window.location = destPage;


      } else {
        console.log('Response code: ' + response.error.code);
        console.log('Response code type: ' + typeof(response.error.code));
        if(+response.error.code ===401){
          dispatch(errorMsg(response.error, "The username or password provided is not correct"));
        } else {
          dispatch(errorMsg(response.error,'There was a server error. Please try again shortly'));
        }
      }
    });
  };
}

export function resetPassword(email, recaptcha){
  return (dispatch, getState) => {

    const postData={
      email: email,
      recaptcha: recaptcha
    }

    // Don't care about the result of this...

    post('/reset', postData);

  }
}

export function createUser(email, password, recaptcha){
  return (dispatch, getState) => {
    const postData={
      email,
      recaptcha,
      username: email,
      password,
    }

    post('/sign-up', postData)
    .then((response)=>{
      console.log('Sign-up response', response)
      if(response.body.errors===undefined){
        dispatch(createUserSent());
      } else {

        console.log('Response code: ' + response.body.errors[0].code);
        console.log('Response code type: ' + typeof(response.body.errors[0].code));
        if(+response.body.errors[0].code ===101){
          console.log('Dispatching to set error msg');
          dispatch(errorMsg(response.body.errors[0], "The email you provided is already registered. Sign in instead"));
        } else {
          dispatch(errorMsg(response.body.errors[0],'There was a server error. Please try again shortly'));
        }
      }
    });
  }
}
