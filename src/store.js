  
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer from './reducers/rootReducer';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';


export default function configureStore() {
 return createStore(
  rootReducer,
   composeWithDevTools(applyMiddleware(thunk, logger, promise))
 );
}