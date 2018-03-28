
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
        authenticated: false
      };
    case 'AUTHENTICATED':
      return {
        ...state,
        authenticated: action.authenticated
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
    default:
      return state;
  }
};

export default auth;


