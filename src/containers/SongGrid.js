import React, { Component } from 'react'
import {connect} from "react-redux"
import FullPageLoading from "../components/FullPageLoading"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { StyleSheet, css } from 'aphrodite';


const styles = StyleSheet.create({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden'
    },
    gridList: {
      width: "100%",
      height: "100%",
    }
  })

//Send request for track details here? or in main container. probs main container for now lmao
export class SongGrid extends Component {
    render() {
        if(this.props.Spotify.playlist_tracks.length === 0 || this.props.Spotify.playlist_tracks_loading || this.props.Spotify.playlist_track_info_loading){
            return(<FullPageLoading></FullPageLoading>)
        }

        else{
            return (
                <div className ={css(styles.root)}>
                    <GridList cellHeight={180} cols={6} className={css(styles.gridList)}>
                        <GridListTile key="Subheader" cols={6} style={{ height: 'auto' }}>
                            <ListSubheader component="div">{this.props.playlist.name}</ListSubheader>
                        </GridListTile>
                        {this.props.Spotify.playlist_tracks[0].map(track => 
                            <GridListTile key={track.track.id} cols={1}>
                                <img src={track.track.album.images[0] ? track.track.album.images[0].url : ""} alt={track.track.name} />
                                <GridListTileBar
                                    title={track.track.name}
                                />
                            </GridListTile>
                        )}
                    </GridList>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    ...state
  });
  
export default connect(
    mapStateToProps
)(SongGrid);