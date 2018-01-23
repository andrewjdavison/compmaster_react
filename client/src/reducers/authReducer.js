
const initialAuthorisationState = {
  authenticated: false,
  isAuthenticating: false,
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
    case 'AUTHENTICATION_HAS_ERRORED':
      return {
        ...state,
        hasErrored: action.hasErrored
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
      };
    case 'SET_PASSWORD':
      return {
        ...state,
        authRequest: {
          username: state.authRequest.username,
          password: action.password}
        ,
      };
    default:
      return state;
  }
};

export default auth;


