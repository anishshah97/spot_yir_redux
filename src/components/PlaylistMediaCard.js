import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia"
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import {storePlaylistSelection} from "../actions/DataFormat"
import {connect} from "react-redux"
import React, { Component } from 'react'



const styles = {
  card: {
      maxWidth: 345
  },
  cardButton: {
    display: "block",
    textAlign: "center",
    width: "100%"
  },
  media: {
      height: 200
  }
};

export class PlaylistMediaCard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  handleClick(){
    this.props.storePlaylistSelection(this.props.data.id)
  }
  

  render() {
    const { classes, data} = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <ButtonBase 
            className={classes.cardButton} 
            onClick={this.handleClick.bind(this)}
            disabled={this.props.Playlists.playlist_tracks_loading || this.props.Playlists.playlist_track_info_loading}
          >
            <CardMedia
              className={classes.media}
              image={data.image[0] ? data.image[0].url : ""} //Throws error bc cant be blank, need better default
              title={data.name}
            />
            <CardContent>
              <Typography component="h2">
                {data.name}
              </Typography>
              {/* <Typography component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography> */}
            </CardContent>
          </ButtonBase>
        </Card>
      </div>
    );
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
)(withStyles(styles)(PlaylistMediaCard));
