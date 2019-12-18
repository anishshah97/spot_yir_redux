import React, { Component } from 'react'
import { connect } from "react-redux";
import { storeSpotToken } from "../actions/Spotify";
//import { authEndpoint, clientId, redirectUri, scopes } from "../utils/spotify_config";
import hash from "../utils/token_hash"
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';


const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
//Is component did mount best for redux?
export class Login extends Component {
    componentDidMount() {
        let _token = hash.access_token;

        if (_token) {
            this.props.storeSpotToken(hash.access_token)
        }
    }
    
    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        href={`${process.env.REACT_APP_SPOT_AUTH_END}?client_id=${process.env.REACT_APP_SPOT_CLID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=${process.env.REACT_APP_SPOT_SCOPES}&response_type=token&show_dialog=true`}
                        onClick = {storeSpotToken}
                    >
                    Login to Spotify
                    </Button>
                </ThemeProvider>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    ...state
  });
  
const mapDispatchToProps = dispatch => ({
    storeSpotToken: (spot_token) => dispatch(storeSpotToken(spot_token))
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);