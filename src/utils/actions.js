import _ from 'lodash';
import {formatDate} from "./data_prep"
var Stats = require('fast-stats').Stats;

export function prepareCalendarData(tracks) {

    let ungrouped_data = tracks.map(function(track) {
        return ({
            exact_time : track.added_at,
            day : formatDate(track.added_at),
            id: track.track.id
        })
    })

    var days = ungrouped_data
        .map(dataItem => dataItem.day) // get all media types
        .filter((day, index, array) => array.indexOf(day) === index) // filter out duplicates

    var counts = days
        .map(day => ({
        day: day,
        value: ungrouped_data.filter(item => item.day === day).length
        //items: ungrouped_data.filter(item => item.day === day)
        }));
    
    var max_date = new Date(Math.max.apply(null, counts.map(function(count){
        var date_obj = new Date(count.day)
        return date_obj
    })))

    var min_date = new Date(Math.min.apply(null, counts.map(function(count){
        var date_obj = new Date(count.day)
        return date_obj
    })))

    var s = new Stats().push(counts.map(item => item.value))
    // var q1 = s.percentile(25)
    // var q3 = s.percentile(75)
    // var out_upperBound = q3 + (1.5*(q3-q1))
    var out_upperBound = s.iqr().range()[1]
    

    return({cal_data: counts, max_date: max_date, min_date: min_date, up_bound: out_upperBound})
}

export function prepareSidebarData(playlists){
    return ({sidebar_playlist: ["TEST"]})
}

//Remove awaits? Make better asynchronous somehow
export async function getSavedTrackList(spotifyAPIHandler) {
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

//General enough for use of any raw input of list of selected saved songs
export async function collectTrackStats(handler, tracks) {
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

//Remove awaits? Make better asynchronous somehow
export async function getPlaylists(spotifyAPIHandler) {
    var options = {limit: 50, offset: 0}
    return(await spotifyAPIHandler.getUserPlaylists(options = options)
    .then(async (resp) => {
        const results = []
        results.push(resp.items)
        while (resp.next) {
            options.offset = resp.offset+50
            resp = await spotifyAPIHandler.getUserPlaylists(options = options)
            results.push(resp.items);
        }
        var followed_playlists = [].concat.apply([], results)
        return followed_playlists
    }))
}

