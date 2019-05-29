import { ActionTypes } from '../actions';

const IsPlayingReducer = (state = {
  play: 'false',
}, action) => {
  switch (action.type) {
    case ActionTypes.PLAY:
      return { play: 'true' };
    case ActionTypes.PAUSE:
      return { play: 'false' };
    case ActionTypes.PLAYSONG:
      return { play: 'true' };
    default:
      return state;
  }
};

export default IsPlayingReducer;
