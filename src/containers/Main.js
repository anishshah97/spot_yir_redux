import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchPlaylists } from "../actions/Spotify";
import SpotifyWebApi from 'spotify-web-api-js'
import Sidebar from "react-sidebar";
import MaterialTitlePanel from "../components/MaterialPanel";
import SidebarContent from "./SideBarContent";
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
          open: false,
          spotAPI: new SpotifyWebApi()
        };
    
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.onSetOpen = this.onSetOpen.bind(this);
    }

    async componentDidMount() {
        if(!(this.props.Spotify.spot_token === "")){
            //Are the awaits necessary? Need to deal with too many api requests
            await this.state.spotAPI.setAccessToken(this.props.Spotify.spot_token)
            await this.props.fetchPlaylists(this.state.spotAPI)
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
            <span>Spotify Secret Social <small>(tracked)</small></span>
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
                {this.props.Data.playlist_selection === "" && (<SavedSongsPage spotAPI={this.state.spotAPI}></SavedSongsPage>)}
                {this.props.Data.playlist_selection !== "" && (<PlaylistPage spotAPI={this.state.spotAPI}></PlaylistPage>)}
            </div>
            </MaterialTitlePanel>
        </Sidebar>
        );
      }
    }


const mapStateToProps = state => ({
    ...state
  });
  
const mapDispatchToProps = dispatch => ({
    fetchPlaylists: (handler) => dispatch(fetchPlaylists(handler)),
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);