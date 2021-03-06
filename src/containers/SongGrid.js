import React, { Component } from 'react'
import {connect} from "react-redux"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
//import ListSubheader from '@material-ui/core/ListSubheader';
import { StyleSheet, css } from 'aphrodite';
import PlaylistOverviewGraph from "../components/PlaylistOverviewGraph"
import PlaylistSorter from "../components/PlaylistSorter"
import PlaylistCreator from "../components/PlaylistCreator"
import _ from 'lodash';

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
      },
      gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      }
  })

//Send request for track details here? or in main container. probs main container for now lmao
export class SongGrid extends Component {

    constructor(props) {
        super(props)
        this.generateSongCards.bind(this)
    }
    

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

    //cdup double click breaks (playlist selection doesnt update redux store but clicking still sets successes to false)

    renderData(){
        var sort_sel = this.props.Data.sort_selection
        var sort_dir = this.props.Data.sort_direction


        var rawTracks = this.props.rawTracks
        var rawTrackInfo = this.props.rawTrackInfo


        if(rawTracks && rawTrackInfo){
            rawTracks = rawTracks.data
            rawTrackInfo = rawTrackInfo.data
        }


        var tracks = _.uniqBy(rawTracks, "track.id")
        var sortedTrackInfo = _.uniqBy(this.sortIDs(rawTrackInfo, sort_sel, sort_dir), "id")

        var order = {};
        var sortedTrackURIChunks = null

        if(tracks.length!==0 && sortedTrackInfo.length!==0){
            sortedTrackInfo.forEach(function (a, i) { order[a.id] = i; });
            tracks.sort(function (a, b) {
                return order[a.track.id] - order[b.track.id];
            });

            sortedTrackURIChunks = _.chunk(tracks.map(track => track.track.uri), 100)
        
        }
        return({sort_sel: sort_sel, sort_dir: sort_dir, tracks: tracks, sortedTrackInfo: sortedTrackInfo, sortedTrackURIChunks: sortedTrackURIChunks})

    }

    generateSongCards(tracks){
        /* Display tracks in cards */ 
        return(<div className={css(styles.root)}>
            <GridList cellHeight={180} cols={6} className={css(styles.gridList)}>
                {/* <GridListTile key="Subheader" cols={6} style={{ height: 'auto' }}>
                    <ListSubheader component="div">{this.props.playlist.name}</ListSubheader>
                </GridListTile> */}
                {tracks.map(track => 
                    <GridListTile key={track.track.id} cols={1}>
                        <img src={track.track.album.images[0] ? track.track.album.images[0].url : ""} alt={track.track.name} />
                        <GridListTileBar
                            title={track.track.name}
                        />
                    </GridListTile>
                )}
            </GridList>
        </div>)
    }

    render() {
        const{ sort_sel, sort_dir, tracks, sortedTrackInfo, sortedTrackURIChunks } = this.renderData()
        var songCards = this.generateSongCards(tracks)     
        return (
            <div>
                <PlaylistSorter></PlaylistSorter>
                <PlaylistOverviewGraph sortedTrackInfo={sortedTrackInfo}></PlaylistOverviewGraph>
                {songCards}
                <PlaylistCreator 
                    name={sort_sel+"_"+sort_dir+"_"+this.props.playlist.name}
                    spotAPI={this.props.spotAPI}
                    track_chunks={sortedTrackURIChunks}
                > 
                </PlaylistCreator>
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
