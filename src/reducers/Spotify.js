export default (state = {

    //Auth
    spot_authenticated : false,
    spot_token : "",

    //Get Me
    me: [],
    me_loading: false,
    me_error: false,
    me_success: false,

    //Me Saved Details
    saved_songs : [],
    saved_songs_loading: false,
    saved_songs_error: false,
    saved_songs_success: false,

    //Audio features of saved songs
    saved_song_details : [],
    saved_song_details_loading: false,
    saved_song_details_error: false,
    saved_song_details_success: false,

    //My Playlists
    followed_playlists : [],
    followed_playlists_loading: false,
    followed_playlists_error: false,
    followed_playlists_success: false,

    //My Playlist Tracks
    playlist_tracks : [],
    playlist_tracks_loading: false,
    playlist_tracks_error: false,
    playlist_tracks_success: false,

    //My Playlist Tracks info
    playlist_track_info : [],
    playlist_track_info_loading: false,
    playlist_track_info_error: false,
    playlist_track_info_success: false,
    
  }, action) => {
    switch (action.type) {
      
      //Store Token
      case "STORE_SPOT_TOKEN":
        return Object.assign({}, state, {
          spot_token : action.spot_token,
          spot_authenticated: true,
        });

      //Deal with promise for me
      case "FETCH_ME_PENDING":
        return Object.assign({}, state, {
          me_loading: true
        });
      case "FETCH_ME_FULFILLED":
        return Object.assign({}, state, {
          me: action.payload,
          me_loading : false,
          me_success: true
        })
      case "FETCH_ME_REJECTED":
        return Object.assign({}, state, {
          me_loading: false,
          me_error: true
        })

      //Deal with promise for saved stracks spotify api js
      case "FETCH_SAVED_SONGS_PENDING":
        return Object.assign({}, state, {
          saved_songs_loading: true
        });
      case "FETCH_SAVED_SONGS_FULFILLED":
        return Object.assign({}, state, {
          saved_songs: action.payload,
          saved_songs_loading : false,
          saved_songs_success: true
        })
      case "FETCH_SAVED_SONGS_REJECTED":
        return Object.assign({}, state, {
          saved_songs_loading: false,
          saved_songs_error: true
        })

      //Deal with from promises from specific song details spotify api js
      case "FETCH_SAVED_SONG_INFO_PENDING":
          return Object.assign({}, state, {
            saved_song_details_loading: true
          });
      case "FETCH_SAVED_SONG_INFO_FULFILLED":
        return Object.assign({}, state, {
          saved_song_details: action.payload,
          saved_song_details_loading : false,
          saved_song_details_success: true
        })
      case "FETCH_SAVED_SONG_INFO_REJECTED":
        return Object.assign({}, state, {
          saved_song_details_loading: false,
          saved_song_details_error: true
        })

      //Deal with from promises from playlists
      case "FETCH_PLAYLISTS_PENDING":
        return Object.assign({}, state, {
          followed_playlists_loading: true
        });
      case "FETCH_PLAYLISTS_FULFILLED":
        return Object.assign({}, state, {
          followed_playlists: action.payload,
          followed_playlists_loading : false,
          followed_playlists_success: true
        })
      case "FETCH_PLAYLISTS_REJECTED":
        return Object.assign({}, state, {
          followed_playlists_loading: false,
          followed_playlists_error: true
        })

      //Deal with from promises from playlist tracks
      case "FETCH_PLAYLIST_TRACKS_PENDING":
        return Object.assign({}, state, {
          playlist_tracks_loading: true
        });
      case "FETCH_PLAYLIST_TRACKS_FULFILLED":
        return Object.assign({}, state, {
          playlist_tracks: action.payload,
          playlist_tracks_loading : false,
          playlist_tracks_success: true,
        })
      case "FETCH_PLAYLIST_TRACKS_REJECTED":
        return Object.assign({}, state, {
          playlist_tracks_loading: false,
          playlist_tracks_error: true
        })

        //Deal with from promises from playlist track info
      case "FETCH_PLAYLIST_TRACK_INFO_PENDING":
        return Object.assign({}, state, {
          playlist_track_info_loading: true
        });
      case "FETCH_PLAYLIST_TRACK_INFO_FULFILLED":
        return Object.assign({}, state, {
          playlist_track_info: action.payload,
          playlist_track_info_loading : false,
          playlist_track_info_success: true
        })
      case "FETCH_PLAYLIST_TRACK_INFO_REJECTED":
        return Object.assign({}, state, {
          playlist_track_info_loading: false,
          playlist_track_info_error: true
        })

      
      default:
        return state;
    }
  };