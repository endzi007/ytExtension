import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { wrapStore } from 'react-chrome-redux';
import logger from 'redux-logger';
import { checkVideo } from './middlewares/video';

const defaultState = {
    selectionMode: "neutral",
    videos: []
}
const store = createStore(rootReducer, defaultState, applyMiddleware(checkVideo, logger));
store.subscribe(()=>{
    console.log(store.getState(), "store on event side");
});
wrapStore(store, {
    portName: "YTEC"
})