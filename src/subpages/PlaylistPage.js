import React, { Component } from 'react'
import SongGrid from "../containers/SongGrid"
import {connect} from "react-redux"
import { fetchPlaylistTracks, fetchPlaylistTrackInfo, fetchPlaylistArtists, markFoundPlaylist } from "../actions/Spotify";
import _ from "lodash"
import FullPageLoading from "../components/FullPageLoading"


export class PlaylistPage extends Component {

    constructor(props) {
        super(props)
        this.findPlaylist.bind(this)
    }
    

    async componentDidMount() {
        await this.checkCachedPlaylists()
    }

    async componentDidUpdate(prevProps, prevState) {
        var tracks_success = prevProps.Playlists.playlist_tracks_success !== this.props.Playlists.playlist_tracks_success
        var track_info_success = prevProps.Playlists.playlist_track_info_success !== this.props.Playlists.playlist_track_info_success

        if( (tracks_success && track_info_success) ){
            await this.checkCachedPlaylists()
        }

    }

    async checkCachedPlaylists(){
        const {playlist_tracks, playlist_track_info, playlist_artists} = this.props.Playlists

        var tracks = this.findPlaylist(playlist_tracks)
        var track_info = this.findPlaylist(playlist_track_info)
        var artist_info = this.findPlaylist(playlist_artists)

        if(!tracks || !track_info || !artist_info){
            const {playlist_tracks_loading, playlist_tracks_success} = this.props.Playlists
            const {playlist_track_info_loading, playlist_track_info_success} = this.props.Playlists
            const {playlist_artists_loading, playlist_artists_success} = this.props.Playlists

            //TODO: Better logic to check status of the requested tracks and info before requesting
            if(!playlist_tracks_loading && !playlist_tracks_success
                && !playlist_track_info_loading && !playlist_track_info_success 
                && !playlist_artists_loading && !playlist_artists_success){
                await this.getFullData()
            }
        }
        else{
            // TODO: fix Side effect of one extra call after it calls itself because it induces an update that will run back into itself
            await this.props.markFoundPlaylist()
        }
    }

    //Will read from store in function instead of passing into for now
    findPlaylist(playlist_arr){
        const {playlist_selection} = this.props.Playlists
        return(_.find(playlist_arr, {pid: playlist_selection}))
    }
    
    //TODO: Save data to state to pass to components for more logical data routing
    async getFullData() {
        const{followed_playlists, playlist_selection} = this.props.Playlists
        const {spotAPI} = this.props
        var chosen_playlist = this.findPlaylist(followed_playlists)

        await this.props.fetchPlaylistTracks(
            spotAPI, 
            chosen_playlist,
            playlist_selection)

        const {playlist_tracks} = this.props.Playlists
        var chosen_playlist_tracks = this.findPlaylist(playlist_tracks)
        if(chosen_playlist_tracks){
            await this.props.fetchPlaylistTrackInfo(
                spotAPI, 
                chosen_playlist_tracks.data,
                playlist_selection)
            
            await this.props.fetchPlaylistArtists(
                spotAPI,
                chosen_playlist_tracks.data,
                playlist_selection
            )
        }
    }



    render() {
        const{playlist_tracks_success, playlist_track_info_success, followed_playlists, playlist_tracks, playlist_track_info, playlist_artists} = this.props.Playlists
        const{spotAPI} = this.props

        var chosen_playlist = this.findPlaylist(followed_playlists)
        var chosen_tracks = this.findPlaylist(playlist_tracks)
        var chosen_track_info = this.findPlaylist(playlist_track_info)
        var chosen_artists = this.findPlaylist(playlist_artists)

        
        // TODO: Move loaders at the container level?
        if(!playlist_tracks_success || !playlist_track_info_success){
            return (<FullPageLoading></FullPageLoading>)
        }
        else{
            return (
                <div>
                    <SongGrid 
                            playlist={chosen_playlist}
                            spotAPI={spotAPI}
                            rawTracks={chosen_tracks}
                            rawTrackInfo={chosen_track_info}
                            rawArtistInfo={chosen_artists}
                    ></SongGrid>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    ...state
  });

const mapDispatchToProps = dispatch => ({
    fetchPlaylistTracks: (handler, playlists, pid) => dispatch(fetchPlaylistTracks(handler, playlists, pid)),
    fetchPlaylistTrackInfo: (handler, tracks, pid) => dispatch(fetchPlaylistTrackInfo(handler, tracks, pid)),
    fetchPlaylistArtists: (handler, tracks, pid) => dispatch(fetchPlaylistArtists(handler, tracks, pid)),
    markFoundPlaylist: () => dispatch(markFoundPlaylist())
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistPage);