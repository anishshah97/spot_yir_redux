export default (state = {

    //My Playlists
    followed_playlists : [],
    followed_playlists_loading: false,
    followed_playlists_error: false,
    followed_playlists_success: false,

    //Playlist Sidebar Data
    playlist_selection: "",

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

    //My Playlist Artists info
    playlist_artists : [],
    playlist_artists_loading: false,
    playlist_artists_error: false,
    playlist_artists_success: false,
    
  }, action) => {
    switch (action.type) {

      //Deal with from promises from playlists
      case "FETCH_PLAYLISTS_PENDING":
        return Object.assign({}, state, {
          followed_playlists_error: false,
          followed_playlists_success: false,
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

    //Store sidebarplaylist
    case "STORE_PLAYLIST_SELECTION":
        return Object.assign({}, state, {
          //tracks
          playlist_tracks_loading: false,
          playlist_tracks_success: false,
          playlist_tracks_error: false,

          //info
          playlist_track_info_loading: false,
          playlist_track_info_success: false,
          playlist_track_info_error: false,

          //artists
          playlist_artists_loading: false,
          playlist_artists_error: false,
          playlist_artists_success: false,

          //selection
          playlist_selection: action.id
    });

    case "MARK_FOUND_PLAYLIST":
        return Object.assign({}, state, {
          //tracks
          playlist_tracks_loading: false,
          playlist_tracks_success: true,
          playlist_tracks_error: false,
          
          //info
          playlist_track_info_loading: false,
          playlist_track_info_success: true,
          playlist_track_info_error: false,

          //artists
          playlist_artists_loading: false,
          playlist_artists_error: true,
          playlist_artists_success: false,
    });


      //Deal with from promises from playlist tracks
      case "FETCH_PLAYLIST_TRACKS_PENDING":
        return Object.assign({}, state, {
          playlist_tracks_success: false,
          playlist_tracks_error: false,
          playlist_tracks_loading: true
        });
      case "FETCH_PLAYLIST_TRACKS_FULFILLED":
        return {
          ...state,
          playlist_tracks : state.playlist_tracks.concat(action.payload),
          playlist_tracks_loading : false,
          playlist_tracks_success: true
        }
      case "FETCH_PLAYLIST_TRACKS_REJECTED":
        return Object.assign({}, state, {
          playlist_tracks_loading: false,
          playlist_tracks_error: true
        })

        //Deal with from promises from playlist track info
      case "FETCH_PLAYLIST_TRACK_INFO_PENDING":
        return Object.assign({}, state, {
          playlist_track_info_success: false,
          playlist_track_info_error: false,
          playlist_track_info_loading: true
        });
      case "FETCH_PLAYLIST_TRACK_INFO_FULFILLED":
        return {
          ...state,
          playlist_track_info : state.playlist_track_info.concat(action.payload),
          playlist_track_info_loading : false,
          playlist_track_info_success: true
        }
      case "FETCH_PLAYLIST_TRACK_INFO_REJECTED":
        return Object.assign({}, state, {
          playlist_track_info_loading: false,
          playlist_track_info_error: true
        })

        //Deal with from promises from playlist track info
        case "FETCH_PLAYLIST_ARTISTS_PENDING":
          return Object.assign({}, state, {
            playlist_artists_success: false,
            playlist_artists_error: false,
            playlist_artists_loading: true
          });
        case "FETCH_PLAYLIST_ARTISTS_FULFILLED":
          return {
            ...state,
            playlist_artists : state.playlist_artists.concat(action.payload),
            playlist_artists_loading : false,
            playlist_artists_success: true
          }
        case "FETCH_PLAYLIST_ARTISTS_REJECTED":
          return Object.assign({}, state, {
            playlist_artists_loading: false,
            playlist_artists_error: true
          })

      
      default:
        return state;
    }
  };