import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchSavedSongs, fetchSavedSongInfo, fetchPlaylists } from "../actions/Spotify";
import SpotifyWebApi from 'spotify-web-api-js'
import {storeCalData} from "../actions/DataFormat"
import Sidebar from "react-sidebar";
import MaterialTitlePanel from "../components/MaterialPanel";
import SidebarContent from "../components/SideBarContent";
import FullPageLoading from "../components/FullPageLoading"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import SavedSongsPage from "../pages/SavedSongsPage"
import PlaylistPage from "../pages/PlaylistPage"

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

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

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
            await this.props.fetchPlaylists(SpotifyAPI)
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
                <ThemeProvider theme={theme}>
                    <Button
                        onClick={this.toggleOpen}
                        style={styles.contentHeaderMenuLink}
                        variant="contained" 
                        color="primary"
                    >
                        =
                    </Button>
                </ThemeProvider>
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
            // Sidebar with own styles in content, uses same material title
            <Sidebar {...sidebarProps} >
                {/* Main Header */}
                <MaterialTitlePanel title={contentHeader}> 
                {/* Use playlist selection as a flag? */}
                <div style={styles.content}>
                    {this.props.Data.playlist_selection === "" && (<SavedSongsPage></SavedSongsPage>)}
                    {this.props.Data.playlist_selection !== "" && (<PlaylistPage></PlaylistPage>)}
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
    storeCalData: (tracks) => dispatch(storeCalData(tracks)),
    fetchPlaylists: (handler) => dispatch(fetchPlaylists(handler)),
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);