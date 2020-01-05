import React, { Component } from 'react'
import SavedCalendar from "../components/SavedCalendar"
import { fetchSavedSongs, fetchSavedSongInfo} from "../actions/Spotify";
import { connect } from "react-redux";
import FullPageLoading from '../components/FullPageLoading';

export class SavedSongsPage extends Component {

    async componentDidMount() {
        if((this.props.spotAPI.getAccessToken() !== null) && (!this.props.Spotify.saved_songs_success)){
            await this.props.fetchSavedSongs(this.props.spotAPI)
            //await this.props.fetchSavedSongInfo(this.props.spotAPI, this.props.Spotify.saved_songs)
        }
    }

    render() {
        //Move loaders to the container level
        if (!this.props.Spotify.saved_songs_success){
            return(<FullPageLoading></FullPageLoading>)
        }
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
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SavedSongsPage);