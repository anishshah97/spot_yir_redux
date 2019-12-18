import React, { Component } from 'react'
import { connect } from "react-redux";
import { storeSpotToken } from "../actions/Spotify";
import { authEndpoint, clientId, redirectUri, scopes } from "../utils/spotify_config";
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
                        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                            "%20"
                        )}&response_type=token&show_dialog=true`}
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