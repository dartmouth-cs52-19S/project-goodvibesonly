import { ActionTypes } from '../actions';

const UserReducer = (state = { location: null }, action) => {
  switch (action.type) {
    case ActionTypes.LOCATION:
      return Object.assign({}, state, { location: { lat: action.payload.lat, lng: action.payload.lng } });
    default:
      return state;
  }
};

export default UserReducer;
