
const initialAuthorisationState = {
  authenticated: false,
  isAuthenticating: false,
  token: undefined,
  user: undefined,
  authRequest: {
    username: undefined,
    password: undefined
  },
  errors: {
    email: "An Error",
    password: undefined,
    summary: undefined
  }
}

const auth = ( state = initialAuthorisationState, action) => {
  switch(action.type) {
    case 'RESET_AUTH':
      return {
        ...state,
        isAuthenticating: false,
        authenticated: false,
        authRequest:{
          username:undefined,
          password:undefined,
        },
        errors: {
          summary: undefined,
        },
      };
    case 'AUTHENTICATION_HAS_ERRORED':
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case 'ERROR':
      return {
        ...state,
        errors: {
          summary: action.summary
        }
      };
    case 'AUTHENTICATIING':
      return {
        ...state,
        isLoading: action.isLoading,
        isAuthenticating: true,
        authenticated: false
      };
    case 'AUTHENTICATED':
      console.log('User Authenticated!');
      return {
        ...state,
        authenticated: true
      };
    case 'SET_USERNAME':
      return {
        ...state,
        authRequest: {
          username: action.username,
          password: state.authRequest.password
        },
        errors:{
          summary: undefined
        },
      };
    case 'SET_PASSWORD':
      return {
        ...state,
        authRequest: {
          username: state.authRequest.username,
          password: action.password}
        ,
        errors:{
          summary: undefined
        },
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };
    case 'SIGNOUT':
      return {
        ...state,
        user: undefined,
        token: undefined,
        authenticated: false,
        isAuthenticating: false
      }
    case 'CREATEUSERSENT':
      return {
        ...state,
        createUserSent: true,
      }
    default:
      return state;
  }
};

export default auth;


