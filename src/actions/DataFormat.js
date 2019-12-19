import {prepareCalendarData} from "../utils/actions"

export const storeCalData = (tracks) => ({
    type: "STORE_CALENDAR_DATA",
    ...prepareCalendarData(tracks)
})

export const storePlaylistSelection = (id) => ({
    type: "STORE_PLAYLIST_SELECTION",
    id: id
})