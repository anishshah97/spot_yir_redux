import { combineReducers } from 'redux';
import Spotify from './Spotify';
import Data from "./DataFormat"
import Animation from "./AnimationHandling"
export default combineReducers({
 Spotify, Data, Animation
});