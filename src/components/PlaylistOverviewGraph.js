import React, { Component } from 'react'
import { connect } from "react-redux";
import { ResponsiveLine } from '@nivo/line'
import { StyleSheet, css } from 'aphrodite';

//TODO: Move styles to separate file
const styles = StyleSheet.create({
    size_cont: {
      height: 700
    }
})

//TODO: Create toggle/checkboxes to display selected metrics

/* Display all values together on graph

var line_data = legend.map(metric => {
            var values = this.props.sortedTrackInfo.map(track => {
                return(
                    {"x": track.id,
                     "y": track[metric]} //Change id to name
                )
            })
            return(
                {
                    "id": metric,
                    "data": values
                }
            )
            }
        )
*/

const commonGraphProps = {
    margin:{ top: 50, right: 110, bottom: 50, left: 60 },
    xScale:{ type: 'point'},
    axisTop:null,
    axisRight:null,
    axisBottom:{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 300,
        legend: 'Songs',
        legendOffset: 40,
        legendPosition: 'middle'
    },
    axisLeft:{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Value',
        legendOffset: -40,
        legendPosition: 'middle'
    },
    colors:[ '#1db954', '#179443', '#116f32', '#0b4a21', '#000000' ],
    pointSize:10,
    pointColor:{ theme: 'background' },
    pointBorderWidth:2,
    pointBorderColor:{ from: 'serieColor' },
    pointLabel:"y",
    pointLabelYOffset:-12,
    enableSlices:"x",
    legends:[
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]
}

const consScale = ["danceability", "energy", "acousticness", "liveness", "valence"]

export class PlaylistOverviewGraph extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            data: [],
            yprops: {
                yScale: { type: 'linear', min: "auto", max: "auto", stacked: false, reverse: false }
            }
        }
    }
    
    componentDidMount() {
        if(this.props.sortedTrackInfo.length !== 0){
            this.cleanData()
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.sortedTrackInfo !== this.props.sortedTrackInfo){
            this.cleanData()
        }
    }

    // TODO: Move to redux action
    cleanData(){
        var yprops = this.state.yprops

        var values = this.props.sortedTrackInfo.map(track => {
            var metric = this.props.Data.sort_selection
            return(
                {"x": track.name, //TODO: Track.name as what is shown on graph but Track.id as what it is actually set as bc sorting on name causes mismatch issues with songs of the same name
                 "y": track[metric]} 
            )
        })
        var line_data = [{
            "id": this.props.Data.sort_selection,
            "data": values
        }]

        if (consScale.includes(this.props.Data.sort_selection)){
            yprops.yScale.min = 0
            yprops.yScale.max = 1
        }
        else{
            yprops.yScale.min = "auto"
            yprops.yScale.max = "auto"
        }
    
        this.setState({data: line_data})
    }
    
    

    render() {
        return (
            <div>
                <div className={css(styles.size_cont)}>
                    <ResponsiveLine
                        data={this.state.data}
                        {...commonGraphProps}
                        {...this.state.yprops}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
  });
  
export default connect(
    mapStateToProps
)(PlaylistOverviewGraph);