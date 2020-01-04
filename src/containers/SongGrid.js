import React, { Component } from 'react'
import {connect} from "react-redux"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { StyleSheet, css } from 'aphrodite';
import PlaylistOverviewGraph from "../components/PlaylistOverviewGraph"
import PlaylistSorter from "../components/PlaylistSorter"
import _ from 'lodash';

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

    //Move to redux data for processing into other graphs no need to do same code
    sortIDs(track_info, sort_sel, dir){
        switch(dir){
            case "asc":
                return([].concat(track_info)
                    .sort((a,b) => a[sort_sel] - b[sort_sel]))
            case "desc":
                return([].concat(track_info)
                    .sort((a,b) => a[sort_sel] - b[sort_sel]).reverse())
                    
            default:
                return([].concat(track_info))
        }
    }

    render() {
        var sort_sel = this.props.Data.sort_selection
        var sort_dir = this.props.Data.sort_direction
        var tracks = _.uniqBy(this.props.Spotify.playlist_tracks[0], "track.id")
        var sortedTrackInfo = _.uniqBy(this.sortIDs(this.props.Spotify.playlist_track_info, sort_sel, sort_dir), "id")
        var order = {};
        sortedTrackInfo.forEach(function (a, i) { order[a.id] = i; });
        tracks.sort(function (a, b) {
            return order[a.track.id] - order[b.track.id];
        });
        

        return (
            <div>
                <PlaylistSorter></PlaylistSorter>
                <PlaylistOverviewGraph sortedTrackInfo = {sortedTrackInfo}></PlaylistOverviewGraph>

                {/* Display tracks in cards */}
                <div className ={css(styles.root)}>
                    <GridList cellHeight={180} cols={6} className={css(styles.gridList)}>
                        <GridListTile key="Subheader" cols={6} style={{ height: 'auto' }}>
                            <ListSubheader component="div">{this.props.playlist.name}</ListSubheader>
                        </GridListTile>
                        {tracks.map(track => 
                            <GridListTile key={track.track.id} cols={1}>
                                <img src={track.track.album.images[0] ? track.track.album.images[0].url : ""} alt={track.track.name} />
                                <GridListTileBar
                                    title={track.track.name}
                                />
                            </GridListTile>
                        )}
                    </GridList>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
  });
  
export default connect(
    mapStateToProps,
)(SongGrid);
