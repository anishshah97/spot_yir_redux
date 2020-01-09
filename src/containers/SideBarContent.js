import MaterialTitlePanel from "../components/MaterialPanel";
import PlaylistMediaCard from "../components/PlaylistMediaCard"
import { connect } from "react-redux"
import React, { Component } from 'react'
import FullPageLoading from "../components/FullPageLoading"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import {storePlaylistSelection} from "../actions/DataFormat"


const styles = {
  sidebar: {
    width: 256,
    height: "100%"
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "#757575",
    textDecoration: "none",
    width: "100%"
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#757575"
  },
  content: {
    padding: "16px",
    height: "100%",
    backgroundColor: "white"
  }
};

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

export class SideBarContent extends Component {

  constructor(props) {
    super(props)
    this.generatePlaylistCards.bind(this)
  }
  

  handleClick(){
    this.props.storePlaylistSelection("")
  }

  generatePlaylistCards(){
    var links = this.props.Playlists.followed_playlists.map(
      function(item){
        return (
          {
            image: item.images,
            id: item.id,
            name: item.name,
            total_tracks: item.tracks.total
          }
        )
      }
    ).map(
      function(playlist){
        return(
          <PlaylistMediaCard data={playlist}></PlaylistMediaCard>
        )
      }
    )

    return(links)
  }
  
  render() {
    // TODO: Replace with better loader animation/lottie
    if(this.props.Playlists.followed_playlists.length === 0){
      return (<FullPageLoading></FullPageLoading>)
    }
    else{
      const style = this.props.style
      ? { ...styles.sidebar, ...this.props.style }
      : styles.sidebar;

      var links = this.generatePlaylistCards()

      return (
          <MaterialTitlePanel title="Menu" style={style}>
            <div style={styles.content}>
            <ThemeProvider theme={theme}>
                <Button 
                  style={styles.sidebarLink}
                  variant="contained" 
                  color="primary"
                  onClick={this.handleClick.bind(this)}
                >
                  Home
                </Button>
            </ThemeProvider>
              <div style={styles.divider} />
              {links}
            </div>
          </MaterialTitlePanel>
      );
    }
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  storePlaylistSelection: (id) => dispatch(storePlaylistSelection(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarContent);