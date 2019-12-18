export default (state = {

    //Auth
    spot_authenticated : false,
    spot_token : "",

    //Me Saved Details
    saved_songs : [],
    saved_songs_loading: false,
    saved_songs_error: false,

    //Audio features of saved songs
    saved_song_details : [],
    saved_song_details_loading: false,
    saved_song_details_error: false
    
  }, action) => {
    switch (action.type) {
      
      //Store Token
      case "STORE_SPOT_TOKEN":
        return Object.assign({}, state, {
          spot_token : action.spot_token,
          spot_authenticated: true,
        });

      //Deal with promise for saved stracks spotify api js
      case "FETCH_SAVED_SONGS_PENDING":
        return Object.assign({}, state, {
          saved_songs_loading: true
        });
      case "FETCH_SAVED_SONGS_FULFILLED":
        return Object.assign({}, state, {
          saved_songs: action.payload,
          saved_songs_loading : false
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
          saved_song_details_loading : false
        })
      case "FETCH_SAVED_SONG_INFO_REJECTED":
        return Object.assign({}, state, {
          saved_song_details_loading: false,
          saved_song_details_error: true
        })

      
      default:
        return state;
    }
  };