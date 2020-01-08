import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchPlaylists, fetchMe } from "../actions/Spotify";
import SpotifyWebApi from 'spotify-web-api-js'
import Sidebar from "react-sidebar";
import MaterialTitlePanel from "../components/MaterialPanel";
import SidebarContent from "../containers/SideBarContent";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import SavedSongsPage from "../subpages/SavedSongsPage"
import PlaylistPage from "../subpages/PlaylistPage"

//TODO: Move styles to seperate file
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

//Green spotify color scheme for material ui components
const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

//Responsive resizing for react sidebar
// TODO: Pass to all components so better responsive handlings
const mql = window.matchMedia(`(min-width: 800px)`);

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
        this.renderContentHeader = this.renderContentHeader.bind(this)
    }

    async componentDidMount() {
        if(this.props.Spotify.spot_token !== ""){
            await this.state.spotAPI.setAccessToken(this.props.Spotify.spot_token) //Wait to set the spotify access token
            await this.props.fetchPlaylists(this.state.spotAPI) //Then fetch playlists
            await this.props.fetchMe(this.state.spotAPI) //And your own details
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

    renderContentHeader() {
        return(
            <span>
                
                {/* Button to toggle the sidebar once the size is small enough to be dockable */}
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
    }
    
    render() {
        const sidebar = <SidebarContent />;
        const contentHeader = this.renderContentHeader()
    
        const sidebarProps = {
            sidebar,
            docked: this.state.docked,
            open: this.state.open,
            onSetOpen: this.onSetOpen
        };

        const {playlist_selection} = this.props.Playlists
        const _token = this.state.spotAPI.getAccessToken()
    
        return (
        // Sidebar with own styles in content, uses same material title
        <Sidebar {...sidebarProps} >
            {/* Main Header */}
            <ThemeProvider theme={theme}>
                <MaterialTitlePanel title={contentHeader}> 
                <div style={styles.content}>
                    {/* Check to see if token was properly passed, if not return error page */}
                    {_token ? 
                    /* If working token then check to see if user selected a playlist or not and route to proper subpage */
                        (playlist_selection === "" ? 
                            (<SavedSongsPage spotAPI={this.state.spotAPI}></SavedSongsPage>)
                            :(<PlaylistPage spotAPI={this.state.spotAPI}></PlaylistPage>))
                        :(<h1>NOT LOGGED IN ERROR</h1>)
                    }
                </div>
                </MaterialTitlePanel>
            </ThemeProvider>
        </Sidebar>
        );
      }
    }


const mapStateToProps = state => ({
    ...state
  });
  
const mapDispatchToProps = dispatch => ({
    fetchPlaylists: (handler) => dispatch(fetchPlaylists(handler)),
    fetchMe: (handler) => dispatch(fetchMe(handler))
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);