import { ActionTypes } from '../actions';

const AuthReducer = (state = {
  authenticated: false, token: '', error: '', userId: '',
}, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return {
        authenticated: true,
        error: '',
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false, error: '' };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false, error: action.message };
    default:
      return state;
  }
};

export default AuthReducer;
