import axios from 'axios';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  PLAYSTATE: 'PLAYSTATE',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
};

const ROOT_URL = 'https://good-vibes-only.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';

export function signin() {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}


// PLAYLIST actions

export function fetchPlaylists() {
  // this will fetch all the playlists in our database
  // can reference lab4 fetchPosts
}

export function fetchPlaylist(id) {
  // this will fetch a specific playlist with the id passed in
  // can reference lab4 fetchPost(id)
}

export function createPlaylist(spotifyPlaylistId) {
  // this will create a new playlist in our DB using the spotify id of
  // an existing spotify playlist, and we'll grab the first 15 songs
  // in our backend call.
}

export function addToPlaylist(playlistId, spotifyTrackId) {
  // this will add the track specified (by spotify track id)
  // to the playlist specified with the mongo playlist id
}

export function activatePlaylist(playlistId, location) {
  // this will activate the playlist with the location specified
}

export function deletePlaylist(playlistId) {
  // this will delete the playlist with the id specified
}

export function getPlayState() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/playstate`).then((response) => {
      console.log(response.data);
      dispatch({ type: ActionTypes.PLAYSTATE, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function sendPlay() {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/play`).then((response) => {
      dispatch({ type: ActionTypes.PLAY, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function sendPause() {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/pause`).then((response) => {
      dispatch({ type: ActionTypes.PAUSE, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}
