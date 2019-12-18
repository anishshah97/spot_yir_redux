import {formatDate} from "../utils/data_prep"
var Stats = require('fast-stats').Stats;


export const storeCalData = (tracks) => ({
    type: "STORE_CALENDAR_DATA",
    ...prepareCalendarData(tracks)
})

function prepareCalendarData(tracks) {

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