import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./pages/Login";
import Main from "./pages/Main"
import IntroVideo from "./pages/IntroVideo"
import "./App.css";

//TODO: Pass theme provider to App for consistent color scheme of material UI

export class App extends Component {
  render() {

    //Flag to check if the user has a token, if not send to login page to get token
    const {spot_authenticated} = this.props.Spotify 

    //Flag to check status of intro video and upon end send to main page
    const {intro_end} = this.props.Animation

    return (
      <div className="App">
        {!spot_authenticated ? (<Login></Login>) : 
          intro_end ? (<Main></Main>) : 
          (<IntroVideo></IntroVideo>)}
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