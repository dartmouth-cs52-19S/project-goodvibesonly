import axios from 'axios';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  FETCH_PLAYLISTS: 'FETCH_PLAYLISTS',
  FETCH_PLAYLIST: 'FETCH_PLAYLIST',
  ACTIVATE_PLAYLIST: 'ACTIVATE_PLAYLIST',
  DELETE_PLAYLIST: 'DELETE_PLAYLIST',
  CREATE_PLAYLIST: 'CREATE_PLAYLIST',
  ADD_TO_PLAYLIST: 'ADD_TO_PLAYLIST',
  PLAYSTATE: 'PLAYSTATE',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  LOCATION: 'LOCATION',
  PLAYSONG: 'PLAYSONG',
};

const ROOT_URL = 'https://good-vibes-only.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';
// const API_PLAYER_URL = 'https://api.spotify.com/v1/me/player';

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
  console.log('id within actions', id);
  // this will fetch a specific playlist with the id passed in
  // can reference lab4 fetchPost(id)
  return (dispatch) => {
    axios.get(`${ROOT_URL}/playlists/${id}`).then((response) => {
      console.log('should log something', response.data);
      dispatch({ type: ActionTypes.FETCH_PLAYLIST, payload: { current: response.data.result[0] } });
    }).catch((error) => {
      console.log('error fetching playlist');
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

export function addToPlaylist(playlistId, spotifyTrackId) {
  // this will add the track specified (by spotify track id)
  // to the playlist specified with the mongo playlist id
  return (dispatch) => {
    axios.put(`${ROOT_URL}/playlists/${playlistId}`, { trackId: spotifyTrackId }).then((response) => {
      dispatch({ type: ActionTypes.ADD_TO_PLAYLIST, payload: { message: response.data } });
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

const API_PLAYER_URL = 'https://api.spotify.com/v1/me/player';
export function getPlayState(token) {
  return (dispatch) => {
    axios.get(`${API_PLAYER_URL}/currently-playing`, { headers: { authorization: `Bearer ${token}` } })
      .then((response) => {
        dispatch({ type: ActionTypes.PLAYSTATE, payload: { currentSong: response.data } });
      })
      .catch((error) => {
        // console.log(`spotify api error: ${error}`);
      });
  };
}

export function sendPlay(token) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/play/${token}`).then((response) => {
      dispatch({ type: ActionTypes.PLAY, payload: {} });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function sendPause(token) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/pause/${token}`).then((response) => {
      dispatch({ type: ActionTypes.PAUSE, payload: {} });
    }).catch((error) => {
      console.log(error);
    });
  };
}

// eslint-disable-next-line camelcase
export function sendPlaySong(token, song_id) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/playsong/${token}`).then((response) => {
      dispatch({ type: ActionTypes.PLAY, payload: { song_id } });
    }).catch((error) => {
      console.log(error);
    });
  };
}
