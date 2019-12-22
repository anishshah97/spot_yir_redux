import React, { Component } from 'react'
import SongGrid from "../containers/SongGrid"
import {connect} from "react-redux"
import { fetchPlaylistTracks, fetchPlaylistTrackInfo } from "../actions/Spotify";
import _ from "lodash"


export class PlaylistPage extends Component {

    constructor(props) {
        super(props)
    }
    

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.Data.playlist_selection !== this.props.Data.playlist_selection){
            this.getData()
        }
    }
    

    async getData() {
        await this.props.fetchPlaylistTracks(this.props.spotAPI, [_.find(this.props.Spotify.followed_playlists, {id: this.props.Data.playlist_selection})])
        await this.props.fetchPlaylistTrackInfo(this.props.spotAPI, this.props.Spotify.playlist_tracks[0])
    }

    render() {
        return (
            <div>
                <SongGrid playlist={_.find(this.props.Spotify.followed_playlists, {id: this.props.Data.playlist_selection})}></SongGrid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
  });

const mapDispatchToProps = dispatch => ({
    fetchPlaylistTracks: (handler, playlists) => dispatch(fetchPlaylistTracks(handler, playlists)),
    fetchPlaylistTrackInfo: (handler, tracks) => dispatch(fetchPlaylistTrackInfo(handler, tracks))

  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistPage);