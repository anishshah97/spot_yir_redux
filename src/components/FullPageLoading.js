import Lottie from 'react-lottie'
import * as animationData from '../lotties/skategirl-phone.json'
import * as footerAnimation1 from '../lotties/celebration-music_blue.json'
import React, { Component } from 'react'
import { fadeInLeft } from 'react-animations'
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    fadeInLeft: {
      animationName: fadeInLeft,
      animationDuration: '1.5s',
    },
    footer : {
            position: "fixed",
            bottom: 0,
            width: "100%",
    }
})

export default class FullPageLoading extends Component {
    render() {
        const mainAni = {
            loop: true,
            autoplay: true, 
            animationData: animationData.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
        };
        const footAni = {
            loop: true,
            autoplay: true, 
            animationData: footerAnimation1.default
        }
        return (
        <div>
            <div className={css(styles.fadeInLeft)}>
                <Lottie options={mainAni}
                    height={300}
                    width={300}
                />
            </div>
            <div className={css(styles.footer)}>
                <Lottie options={footAni}
                    height={400}
                    width={400}
                />
            </div>
        </div>
        )
    }
}
