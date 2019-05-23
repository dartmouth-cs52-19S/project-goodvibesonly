import { ActionTypes } from '../actions';

const AuthReducer = (state = {
  authenticated: false, message: '', token: '', error: '',
}, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      console.log('token in reducer', action.payload.token);
      return {
        authenticated: true, error: '', message: action.payload.message, token: action.payload.token,
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
