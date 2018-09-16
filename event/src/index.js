import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { wrapStore, alias } from 'react-chrome-redux';
import logger from 'redux-logger';
import { checkVideo } from './middlewares/video';
import ReduxThunk from 'redux-thunk';
import aliases from './aliases';
const defaultState = {
    selectionMode: "neutral",
    videos: []
}


const store = createStore(rootReducer, defaultState, applyMiddleware(alias(aliases), ReduxThunk, checkVideo, logger));

wrapStore(store, {
    portName: "YTEC"
})

/* chrome.extension.onMessage.addListener((request, sender, response)=>{
    console.log(store.getState(), "ddd");
}); */