import React, { Component } from 'react'
import { connect } from "react-redux";
import { ResponsiveLine } from '@nivo/line'
import { fadeInRight } from 'react-animations'
import { StyleSheet, css } from 'aphrodite';
import FullPageLoading from "./FullPageLoading"

const ani_styles = StyleSheet.create({
    fadeInRight: {
      animationName: fadeInRight,
      animationDuration: '0.5s',
      height: 700
    }
})

const legend = ["danceability", "energy", "acousticness", "liveness", "valence"]

export class PlaylistOverviewGraph extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            data: []
        }
    }
    
    componentDidMount() {
        if(this.props.sortedTrackInfo.length !== 0){
            this.cleanData()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.sortedTrackInfo !== this.props.sortedTrackInfo){
            this.cleanData()
        }
    }

    cleanData(){
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
        this.setState({data: line_data})
    }
    
    

    render() {
        return (
            <div>
                <div className={css(ani_styles.fadeInRight)}>
                    <ResponsiveLine
                        data={this.state.data}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        xScale={{ type: 'point' }}
                        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Songs',
                            legendOffset: 36,
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Value',
                            legendOffset: -40,
                            legendPosition: 'middle'
                        }}
                        colors={{ scheme: 'nivo' }}
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabel="y"
                        pointLabelYOffset={-12}
                        useMesh={true}
                        legends={[
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
                        ]}
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