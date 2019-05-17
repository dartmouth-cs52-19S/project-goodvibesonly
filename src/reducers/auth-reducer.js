import { ActionTypes } from '../actions';

const AuthReducer = (state = { authenticated: false, error: '' }, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { authenticated: true, error: '', message: action.payload };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false, error: '' };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false, error: action.message };
    default:
      return state;
  }
};

export default AuthReducer;
