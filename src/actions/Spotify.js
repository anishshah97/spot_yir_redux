import _ from 'lodash';

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

//Remove awaits? Make better asynchronous somehow
async function getSavedTrackList(spotifyAPIHandler) {
    var options = {limit: 50, offset: 0}
    return(await spotifyAPIHandler.getMySavedTracks(options = options)
    .then(async (resp) => {
        const results = []
        results.push(resp.items)
        while (resp.next) {
            options.offset = resp.offset+50
            resp = await spotifyAPIHandler.getMySavedTracks(options = options)
            results.push(resp.items);
        }
        var saved_tracks = [].concat.apply([], results)
        return saved_tracks
    }))
}

export const fetchSavedSongInfo = (handler, tracks) => dispatch => {
    return dispatch({
        type: "FETCH_SAVED_SONG_INFO",
        payload: collectTrackStats(handler, tracks)
    })
}

//General enough for use of any raw input of list of selected saved songs
async function collectTrackStats(handler, tracks) {
    let track_data = tracks.map(function(track) {
        let track_dict = {}
        track_dict.id = track.track.id
        track_dict.added_at = track.added_at
        return (track_dict)
    })

    async function audioAPI(track_chunk){
        let track_ids = track_chunk.map(track_dict => track_dict.id)
        return await handler.getAudioFeaturesForTracks(track_ids)
        .then(function (resp){
            return resp.audio_features
        })
    }

    function fillTrackData(track_data, stats){
        var track_stats = [].concat.apply([], stats)
        let data = [];

        for(let i=0; i<track_data.length; i++) {
        data.push({
        ...track_data[i], 
        ...(track_stats.find((itmInner) => itmInner.id === track_data[i].id))}
        );
        }
        return data
    }

    return(Promise.all(_.chunk(track_data, 100).map(audioAPI, {handler : handler}))
    .then(fillTrackData.bind(null, track_data)))
    
}