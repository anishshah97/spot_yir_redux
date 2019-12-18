import React, { Component } from 'react'
import { connect } from "react-redux";
import { formatDate } from "../utils/data_prep"
import { ResponsiveCalendar } from '@nivo/calendar'
import { bounceInUp, bounceInDown } from 'react-animations'
import { StyleSheet, css } from 'aphrodite';
import FullPageLoading from "./FullPageLoading"

const styles = StyleSheet.create({
    bounceInUp: {
      animationName: bounceInUp,
      animationDuration: '1.5s',
      height: 700
    },
    bounceInDown: {
        animationName: bounceInDown,
        animationDuration: '1.5s'
    }

  })



export class SavedCalendar extends Component {

    render() {
        //Leave loading to each component or nest in the container bc will be batch request to get all data?
        if(this.props.Data.cal_data.length <= 0){
            return(<FullPageLoading></FullPageLoading>)
        }
        else {
            let min_date = formatDate(this.props.Data.min_date)
            let max_date = formatDate(this.props.Data.max_date)
            return (
                <div>
                    <h1 className={css(styles.bounceInDown)}> Do you even save songs bro? </h1>
                            <div className={css(styles.bounceInUp)}>
                                <ResponsiveCalendar
                                    data={this.props.Data.cal_data}
                                    from={min_date}
                                    to={max_date}
                                    emptyColor="#eeeeee"
                                    colors={[ '#1db954', '#179443', '#116f32', '#0b4a21', '#000000' ]}
                                    maxValue = {this.props.Data.up_bound}
                                    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                                    yearSpacing={40}
                                    monthBorderColor="#ffffff"
                                    dayBorderWidth={2}
                                    dayBorderColor="#ffffff"
                                    legends={[
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
                                    ]}
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
  
export default connect(
    mapStateToProps
)(SavedCalendar);