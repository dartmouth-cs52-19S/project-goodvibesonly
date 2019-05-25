import axios from 'axios';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  FETCH_PLAYLISTS: 'FETCH_PLAYLISTS',
  FETCH_PLAYLIST: 'FETCH_PLAYLIST',
  ACTIVATE_PLAYLIST: 'ACTIVATE_PLAYLIST',
  DELETE_PLAYLIST: 'DELETE_PLAYLIST',
  CREATE_PLAYLIST: 'CREATE_PLAYLIST',
  PLAYSTATE: 'PLAYSTATE',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  LOCATION: 'LOCATION',
};

const ROOT_URL = 'https://good-vibes-only.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';

// ---------------------------USER actions----------------------------------- //
export function authenticate(token, userId) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.AUTH_USER, payload: { token, userId } });
  };
}

export function updateLocation(lat, lng) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOCATION, payload: { lat, lng } });
  };
}


// -------------------------PLAYLIST actions--------------------------------- //
export function fetchPlaylists() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/playlists`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_PLAYLISTS, payload: { all: response.data } });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchPlaylist(id) {
  // this will fetch a specific playlist with the id passed in
  // can reference lab4 fetchPost(id)
  return (dispatch) => {
    axios.get(`${ROOT_URL}/playlists/${id}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_PLAYLIST, payload: { current: response.data.result[0] } });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function createPlaylist(spotifyPlaylistId, title, userId, lat, lng) {
  // this will create a new playlist in our DB using the spotify id of
  // an existing spotify playlist, and we'll grab the first 15 songs
  // in our backend call.
  return (dispatch) => {
    axios.post(`${ROOT_URL}/playlists`, {
      spotifyId: spotifyPlaylistId, title, userId, lat, lng,
    }).then((response) => {
      console.log('create playlist response', response);
      dispatch({ type: ActionTypes.CREATE_PLAYLIST, payload: { message: response.data.message, playlistId: response.data.playlistId } });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function addToPlaylist(playlistId, spotifyTrackId, userId) {
  // this will add the track specified (by spotify track id)
  // to the playlist specified with the mongo playlist id
  return (dispatch) => {
    axios.put(`${ROOT_URL}/playlists/${playlistId}`, { trackId: spotifyTrackId, userId }).then((response) => {
      dispatch({ type: ActionTypes.ADD_TO_PLAYLIST, payload: { } });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function activatePlaylist(playlistId, lat, lng) {
  // this will activate the playlist with the location specified
  return (dispatch) => {
    axios.put(`${ROOT_URL}/playlists/${playlistId}`, { lat, lng }).then((response) => {
      dispatch({ type: ActionTypes.ACTIVATE_PLAYLIST, payload: { } });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function deletePlaylist(playlistId) {
  // this will delete the playlist with the id specified
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/playlists/${playlistId}`).then((response) => {
      dispatch({ type: ActionTypes.DELETE_PLAYLIST, payload: { } });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getPlayState(token) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/playstate`, { token }).then((response) => {
      console.log(response.data);
      dispatch({ type: ActionTypes.PLAYSTATE, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function sendPlay(token) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/play`, { token }).then((response) => {
      dispatch({ type: ActionTypes.PLAY, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function sendPause(token) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/pause`, { token }).then((response) => {
      dispatch({ type: ActionTypes.PAUSE, payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}
