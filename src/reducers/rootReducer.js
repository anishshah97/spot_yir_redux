import { combineReducers } from 'redux';
import Spotify from './Spotify';
import Data from "./DataFormat"
import Animation from "./AnimationHandling"
import Playlists from "./Playlists"
export default combineReducers({
 Spotify, Data, Animation, Playlists
});