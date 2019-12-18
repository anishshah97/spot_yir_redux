import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchSavedSongs, fetchSavedSongInfo } from "../actions/Spotify";
import SpotifyWebApi from 'spotify-web-api-js'
import SavedCalendar from "../components/SavedCalendar"
import {storeCalData} from "../actions/DataFormat"


//Is component did mount best for redux?
export class Main extends Component {
    async componentDidMount() {
        let SpotifyAPI = new SpotifyWebApi()
        if(!(this.props.Spotify.spot_token === "")){
            //Are the awaits necessary?
            SpotifyAPI.setAccessToken(this.props.Spotify.spot_token)
            await this.props.fetchSavedSongs(SpotifyAPI)
            await this.props.storeCalData(this.props.Spotify.saved_songs)
            await this.props.fetchSavedSongInfo(SpotifyAPI, this.props.Spotify.saved_songs) //Should i pass it in or refer to it in the redux action?
        }
    }
    
    render() {
        return (
            <div>
                <SavedCalendar></SavedCalendar>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    ...state
  });
  
const mapDispatchToProps = dispatch => ({
    fetchSavedSongs: (handler) => dispatch(fetchSavedSongs(handler)),
    fetchSavedSongInfo: (handler, tracks) => dispatch(fetchSavedSongInfo(handler, tracks)),
    storeCalData: (tracks) => dispatch(storeCalData(tracks))
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);