import {prepareCalendarData, prepareSidebarData} from "../utils/actions"

export const storeCalData = (tracks) => ({
    type: "STORE_CALENDAR_DATA",
    ...prepareCalendarData(tracks)
})

export const storeSidebarPlaylist = (playlists) => ({
    type: "STORE_SIDEBAR_PLAYLIST",
    ...prepareSidebarData(playlists)
})