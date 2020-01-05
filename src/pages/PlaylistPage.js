import React, { Component } from 'react'
import SongGrid from "../containers/SongGrid"
import {connect} from "react-redux"
import { fetchPlaylistTracks, fetchPlaylistTrackInfo, markFoundPlaylist } from "../actions/Spotify";
import _ from "lodash"
import FullPageLoading from "../components/FullPageLoading"


export class PlaylistPage extends Component {

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
        var tracks = _.find(this.props.Playlists.playlist_tracks, {pid: this.props.Playlists.playlist_selection})
        var track_info = _.find(this.props.Playlists.playlist_track_info, {pid: this.props.Playlists.playlist_selection})

        if(!tracks || !track_info){
            if(!this.props.Playlists.playlist_tracks_loading && !this.props.Playlists.playlist_tracks_success
                && !this.props.Playlists.playlist_track_info_loading && !this.props.Playlists.playlist_track_info_success ){
                await this.getFullData()
            }
        }
        else{
            //Side effect of one extra call after it calls itself because it induces an update that will run back into itself
            await this.props.markFoundPlaylist()
        }
    }
    
    async getFullData() {
        var chosen_playlist = _.find(this.props.Playlists.followed_playlists, {id: this.props.Playlists.playlist_selection})
        await this.props.fetchPlaylistTracks(
            this.props.spotAPI, 
            chosen_playlist,
            this.props.Playlists.playlist_selection)
        
        var playlist_tracks = _.find(this.props.Playlists.playlist_tracks, {pid: this.props.Playlists.playlist_selection})
        if(playlist_tracks){
            await this.props.fetchPlaylistTrackInfo(
                this.props.spotAPI, 
                playlist_tracks.data,
                this.props.Playlists.playlist_selection)
        }
    }

    render() {
        //Move loaders at the container level?
        if(!this.props.Playlists.playlist_tracks_success || !this.props.Playlists.playlist_track_info_success){
            return (<FullPageLoading></FullPageLoading>)
        }
        else{
            return (
                <div>
                    <SongGrid 
                            playlist={_.find(this.props.Playlists.followed_playlists, {id: this.props.Playlists.playlist_selection})}
                            spotAPI={this.props.spotAPI}
                            rawTracks={_.find(this.props.Playlists.playlist_tracks, {pid: this.props.Playlists.playlist_selection})}
                            rawTrackInfo={_.find(this.props.Playlists.playlist_track_info, {pid: this.props.Playlists.playlist_selection})}
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
    markFoundPlaylist: () => dispatch(markFoundPlaylist())
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistPage);