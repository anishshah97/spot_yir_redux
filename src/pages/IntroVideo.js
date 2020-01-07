import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { StyleSheet, css } from 'aphrodite';
import { connect } from "react-redux";
import {toggleVideoEnd} from "../actions/AnimationHandling"
import Lottie from 'react-lottie'
import * as animationData from '../lotties/forward-media.json'

//TODO: Move styles to separate file
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

const staticPlayerProps = {
    playing:true,
    loop:false,
    muted:true,
    height:'100vh',
    width:"100vw"
}

const staticLottieProps = {
    height:"100%",
    width:"100%"
}

export class IntroVideo extends Component {

    render() {
        const {toggleVideoEnd} = this.props
        return (
            <div className={css(styles.player)} >
                <div className = {css(styles.skip)} onClick = {toggleVideoEnd}>
                    <Lottie options={skipAni} {...staticLottieProps}/>
                </div>
                <ReactPlayer 
                    url='https://www.youtube.com/watch?v=0xyqSx96PPo' 
                    onEnded={toggleVideoEnd}
                    {...staticPlayerProps}
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