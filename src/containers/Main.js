import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchSavedSongs, fetchSavedSongInfo } from "../actions/Spotify";
import SpotifyWebApi from 'spotify-web-api-js'
import SavedCalendar from "../components/SavedCalendar"
import {storeCalData} from "../actions/DataFormat"
import Sidebar from "react-sidebar";
import MaterialTitlePanel from "../components/MaterialPanel";
import SidebarContent from "../components/SideBarContent";
import FullPageLoading from "../components/FullPageLoading"


const styles = {
  contentHeaderMenuLink: {
    textDecoration: "none",
    color: "white",
    padding: 8
  },
  content: {
    padding: "16px"
  }
};

const mql = window.matchMedia(`(min-width: 800px)`);

//Is component did mount best for redux?
export class Main extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          docked: mql.matches,
          open: false
        };
    
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.onSetOpen = this.onSetOpen.bind(this);
    }

    async componentDidMount() {
        let SpotifyAPI = new SpotifyWebApi()
        if(!(this.props.Spotify.spot_token === "")){
            //Are the awaits necessary?
            SpotifyAPI.setAccessToken(this.props.Spotify.spot_token)
            await this.props.fetchSavedSongs(SpotifyAPI)
            await this.props.storeCalData(this.props.Spotify.saved_songs)
            await this.props.fetchSavedSongInfo(SpotifyAPI, this.props.Spotify.saved_songs) //Should i pass it in or refer to it in the redux action?
        }
    }
    
    componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
    }

    onSetOpen(open) {
    this.setState({ open });
    }

    mediaQueryChanged() {
    this.setState({
        docked: mql.matches,
        open: false
    });
    }

    toggleOpen(ev) {
    this.setState({ open: !this.state.open });

    if (ev) {
        ev.preventDefault();
    }
    }
    
    render() {
        if(this.props.Data.cal_data.length <= 0){
            return(<FullPageLoading></FullPageLoading>)
        }
        else {
            const sidebar = <SidebarContent />;
        
            const contentHeader = (
            <span>
                {!this.state.docked && (
                <a
                    onClick={this.toggleOpen}
                    href="#"
                    style={styles.contentHeaderMenuLink}
                >
                    =
                </a>
                )}
                <span>Spotify Secret Social</span>
            </span>
            );
        
            const sidebarProps = {
            sidebar,
            docked: this.state.docked,
            open: this.state.open,
            onSetOpen: this.onSetOpen
            };
        
            return (
            <Sidebar {...sidebarProps}>
                <MaterialTitlePanel title={contentHeader}>
                <div style={styles.content}>
                    <SavedCalendar></SavedCalendar>
                </div>
                </MaterialTitlePanel>
            </Sidebar>
            );
        }
      }
    }


const mapStateToProps = state => ({
    ...state
  });
  
const mapDispatchToProps = dispatch => ({
    fetchSavedSongs: (handler) => dispatch(fetchSavedSongs(handler)),
    fetchSavedSongInfo: (handler, tracks) => dispatch(fetchSavedSongInfo(handler, tracks)),
    storeCalData: (tracks) => dispatch(storeCalData(tracks))
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);