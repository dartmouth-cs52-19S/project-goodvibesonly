import axios from 'axios';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
};

const ROOT_URL = 'https://good-vibes-only.herokuapp.com/api';

export function signin() {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}
