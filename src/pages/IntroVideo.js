import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { StyleSheet, css } from 'aphrodite';
import { connect } from "react-redux";
import {toggleVideoEnd} from "../actions/AnimationHandling"
import Lottie from 'react-lottie'
import * as animationData from '../lotties/forward-media.json'

const styles = StyleSheet.create({
    skip : {
        height: 100,
        width: 100
    }
})

const skipAni = {
    loop: true,
    autoplay: true, 
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

export class IntroVideo extends Component {

    render() {
        return (
            <div className={css(styles.player)} >
                <div 
                    className = {css(styles.skip)}
                    onClick = {this.props.toggleVideoEnd}
                >
                    <Lottie options={skipAni}
                        height={"100%"}
                        width={"100%"}
                    />
                </div>
                <ReactPlayer 
                    url='https://www.youtube.com/watch?v=0xyqSx96PPo' 
                    playing={true}
                    loop={false}
                    muted={true}
                    height={'100vh'}
                    width={"100vw"}
                    onEnded={this.props.toggleVideoEnd}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
  });
  
const mapDispatchToProps = dispatch => ({
    toggleVideoEnd: () => dispatch(toggleVideoEnd())
  });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntroVideo);