import React, { Component } from 'react'
import SongGrid from "../containers/SongGrid"
import {connect} from "react-redux"
import { fetchPlaylistTracks, fetchPlaylistTrackInfo, markFoundPlaylist } from "../actions/Spotify";
import _ from "lodash"


export class PlaylistPage extends Component {

    componentDidMount() {
        var tracks = _.find(this.props.Playlists.playlist_tracks, {pid: this.props.Playlists.playlist_selection})
        var track_info = _.find(this.props.Playlists.playlist_track_info, {pid: this.props.Playlists.playlist_selection})

        if(!tracks && !track_info){
            this.getFullData()
        }
        else{
            this.props.markFoundPlaylist()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        var tracks = _.find(this.props.Playlists.playlist_tracks, {pid: this.props.Playlists.playlist_selection})
        var track_info = _.find(this.props.Playlists.playlist_track_info, {pid: this.props.Playlists.playlist_selection})
    
        if(prevProps.Playlists.playlist_selection !== this.props.Playlists.playlist_selection){
            if(!tracks && !track_info){
                this.getFullData()
            }
            else{
                this.props.markFoundPlaylist()
            }
        }
    }
    
    async getFullData() {
        await this.props.fetchPlaylistTracks(
            this.props.spotAPI, 
            _.find(this.props.Playlists.followed_playlists, {id: this.props.Playlists.playlist_selection}),
            this.props.Playlists.playlist_selection)
        await this.props.fetchPlaylistTrackInfo(
            this.props.spotAPI, 
            _.find(this.props.Playlists.playlist_tracks, {pid: this.props.Playlists.playlist_selection}).data,
            this.props.Playlists.playlist_selection)
    }

    render() {
        //console.log(_.find(this.props.Playlists.playlist_tracks, {pid: this.props.Playlists.playlist_selection}))
        //console.log(_.find(this.props.Playlists.playlist_track_info, {pid: this.props.Playlists.playlist_selection}))

        return (
            <div>
                {this.props.Playlists.playlist_tracks_success && this.props.Playlists.playlist_track_info_success && //Should come up with better in between transitions or such
                    (<SongGrid 
                        playlist={_.find(this.props.Playlists.followed_playlists, {id: this.props.Playlists.playlist_selection})}
                        spotAPI={this.props.spotAPI}
                        rawTracks={_.find(this.props.Playlists.playlist_tracks, {pid: this.props.Playlists.playlist_selection})}
                        rawTrackInfo={_.find(this.props.Playlists.playlist_track_info, {pid: this.props.Playlists.playlist_selection})}
                    ></SongGrid>)
                }
            </div>
        )
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