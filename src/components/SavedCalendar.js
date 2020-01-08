import React, { Component } from 'react'
import { connect } from "react-redux";
import { formatDate } from "../utils/data_prep"
import { ResponsiveCalendar } from '@nivo/calendar'
import { StyleSheet, css } from 'aphrodite';
import {storeCalData} from "../actions/DataFormat"
import FullPageLoading from '../components/FullPageLoading';

const styles = StyleSheet.create({
    size_cont: {
      height: 700
    }
})

const commonGraphProps = {
    emptyColor:"#eeeeee",
    colors:[ '#1db954', '#179443', '#116f32', '#0b4a21', '#000000' ],
    margin:{ top: 40, right: 40, bottom: 40, left: 40 },
    yearSpacing:40,
    monthBorderColor:"#ffffff",
    dayBorderWidth:2,
    dayBorderColor:"#ffffff",
    legends:[
        {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left'
        }
    ]
}

export class SavedCalendar extends Component {
    
    constructor(props) {
        super(props)
        this.generateCalData.bind(this)   
    }
    

    componentDidMount() {
        this.generateCalData()
    }
    
    componentDidUpdate() {
        this.generateCalData()
    }

    generateCalData(){
        //Data has not been stored and the songs have been successfully collected from the API
        if (this.props.Data.cal_data.length === 0 && this.props.Spotify.saved_songs_success){
            this.props.storeCalData(this.props.Spotify.saved_songs)
        }
    }

    render() {
        //Move loaders to the container level
        if (!this.props.Spotify.saved_songs_success){
            return(<FullPageLoading></FullPageLoading>)
        }
        else{
            let min_date = formatDate(this.props.Data.min_date)
            let max_date = formatDate(this.props.Data.max_date)
            return (
                
                <div> {/* Do i need this div? */}
                    <div className={css(styles.size_cont)}>
                        <ResponsiveCalendar
                            data={this.props.Data.cal_data}
                            from={min_date}
                            to={max_date}
                            maxValue = {this.props.Data.up_bound}
                            {...commonGraphProps}
                        />
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    ...state
  });
  
const mapDispatchToProps = dispatch => ({
    storeCalData: (tracks) => dispatch(storeCalData(tracks)),
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SavedCalendar);