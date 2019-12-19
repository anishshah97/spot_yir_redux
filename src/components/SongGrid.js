import React, { Component } from 'react'
import {connect} from "react-redux"

//Send request for track details here? or in main container. probs main container for now lmao
export class SongGrid extends Component {
    render() {
        return (
            <div>
                {this.props.Data.playlist_selection}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
  });
  
export default connect(
    mapStateToProps
)(SongGrid);