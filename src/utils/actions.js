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

    if(max_date === null){
        min_date = new Date()
        max_date = new Date()
        out_upperBound = 0
    }
    

    return({cal_data: counts, max_date: max_date, min_date: min_date, up_bound: out_upperBound})
}

//Remove awaits? Make better asynchronous somehow
export async function getSavedTrackList(spotifyAPIHandler) {
    var options = {limit: 50}
    return(await spotifyAPIHandler.getMySavedTracks(options)
    .then(async (resp) => {
        options.offset = 0
        const results = []
        results.push(resp.items)
        while (resp.next) {
            options.offset = resp.offset+50
            resp = await spotifyAPIHandler.getMySavedTracks(options)
            results.push(resp.items);
        }
        var saved_tracks = [].concat.apply([], results)
        return saved_tracks
    }))
}

//General enough for use of any raw input of list of selected saved songs
export async function collectTrackStats(handler, tracks, pid = null) {
    tracks = _.filter(tracks, null)
    let track_data = tracks.map(function(track) {
        let track_dict = {}
        track_dict.id = track.track.id
        track_dict.added_at = track.added_at
        track_dict.name = track.track.name
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

        track_stats = _.filter(track_stats, null)

        for(let i=0; i<track_data.length; i++) {
            data.push({
                ...track_data[i], 
                ...(track_stats.find((itmInner) => itmInner.id === track_data[i].id))}
            );
        }
        return data
    }

    let resp = Promise.all(_.chunk(track_data, 100).map(audioAPI, {handler : handler}))
    .then(fillTrackData.bind(null, track_data))

    if(pid){
        resp = resp.then(data => {
            var val = {pid: pid, data: data}
            return(val)
        })
    }

    return(resp)
    
}

//Remove awaits? Make better asynchronous somehow
export async function getPlaylists(spotifyAPIHandler) {
    var options = {limit: 50, offset: 0}
    return(await spotifyAPIHandler.getUserPlaylists(options)
    .then(async (resp) => {
        const results = []
        results.push(resp.items)
        while (resp.next) {
            options.offset = resp.offset+50
            resp = await spotifyAPIHandler.getUserPlaylists(options)
            results.push(resp.items);
        }
        var followed_playlists = [].concat.apply([], results)
        return followed_playlists
    }))
}

export async function getPlaylistTracks(handler, playlist, pid) {
    //inefficient search through all track elemtns to find matching pids but meh
    
    async function collectPlaylistTracks(playlist, handler, pid){
        var options = {limit: 100, offset: 0}
        return await handler.getPlaylistTracks(pid, options)
        .then(async function (resp){
            const results = []
            results.push(resp.items)
            while (resp.next) {
                options.offset = resp.offset+100
                resp = await handler.getPlaylistTracks(pid, options)
                results.push(resp.items);
            }
            var playlist_tracks = [].concat.apply([], results)
            return {pid: pid, data: playlist_tracks}
        })
    }
    let playlist_tracks = collectPlaylistTracks(playlist, handler, pid)
    //console.log(playlist_tracks)

    //Add in a step to add ID for easy looking?

    return(playlist_tracks.then(data => data))
}

export function getMe(handler){
    return(handler.getMe())
}
