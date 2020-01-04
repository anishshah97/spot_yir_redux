import {getSavedTrackList, collectTrackStats, getPlaylists, getPlaylistTracks, getMe} from "../utils/actions"

export const storeSpotToken = spot_token => ({
    type: "STORE_SPOT_TOKEN", 
    spot_token
})

export const fetchSavedSongs = (handler) => dispatch => {
    return dispatch({
        type: "FETCH_SAVED_SONGS",
        payload: getSavedTrackList(handler)
    })
}

export const fetchSavedSongInfo = (handler, tracks) => dispatch => {
    return dispatch({
        type: "FETCH_SAVED_SONG_INFO",
        payload: collectTrackStats(handler, tracks)
    })
}

export const fetchPlaylists = (handler) => dispatch => {
    return dispatch({
        type: "FETCH_PLAYLISTS",
        payload: getPlaylists(handler)
    })
}

export const fetchPlaylistTracks = (handler, playlists) => dispatch => {
    return dispatch({
        type: "FETCH_PLAYLIST_TRACKS",
        payload: getPlaylistTracks(handler, playlists)
    })
}

export const fetchPlaylistTrackInfo = (handler, tracks) => dispatch => {
    return dispatch({
        type: "FETCH_PLAYLIST_TRACK_INFO",
        payload: collectTrackStats(handler, tracks)
    })
}

export const fetchMe = (handler) => dispatch => {
    return dispatch({
        type: "FETCH_ME",
        payload: getMe(handler)
    })
}