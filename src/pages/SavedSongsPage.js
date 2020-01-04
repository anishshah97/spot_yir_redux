import React, { Component } from 'react'
import SavedCalendar from "../components/SavedCalendar"
import { fetchSavedSongs, fetchSavedSongInfo} from "../actions/Spotify";
import { connect } from "react-redux";
import {storeCalData} from "../actions/DataFormat"




export class SavedSongsPage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    

    async componentDidMount() {
        //401 bc this is running before token set in main
        if(!(this.props.spotAPI.getAccessToken() === null)){
            await this.props.fetchSavedSongs(this.props.spotAPI)
            await this.props.storeCalData(this.props.Spotify.saved_songs)
            //await this.props.fetchSavedSongInfo(this.props.spotAPI, this.props.Spotify.saved_songs)//Should i pass it in or refer to it in the redux action?
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
    storeCalData: (tracks) => dispatch(storeCalData(tracks)),
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SavedSongsPage);