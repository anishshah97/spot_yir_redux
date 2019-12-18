import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./components/Login";
import Main from "./containers/Main"
import IntroVideo from "./components/IntroVideo"
import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="App">
        {!this.props.Spotify.spot_authenticated && (<Login></Login>)}
        {(this.props.Spotify.spot_authenticated && !this.props.Animation.intro_end) && (<IntroVideo></IntroVideo>)}
        {(this.props.Spotify.spot_authenticated && this.props.Animation.intro_end) && (<Main></Main>)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(
  mapStateToProps
  )(App);