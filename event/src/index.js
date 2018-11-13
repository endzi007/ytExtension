import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { wrapStore, alias } from 'react-chrome-redux';
import logger from 'redux-logger';
import { checkVideo } from './middlewares/video';
import { appConfig } from './middlewares/appConfig';
import ReduxThunk from 'redux-thunk';
import aliases from './aliases';

const defaultState = {
    appConfig: {
        selectionMode: "neutral",
        downloadMode: "mp3"
    },
    videos: []
}

/* chrome.webNavigation.onHistoryStateUpdated.addListener(function (data){
    chrome.tabs.query({currentWindow: true, active: true}, (tabs)=>{
        chrome.tabs.executeScript(tabs[0].id, {file: '/content.js'});
    });
});
 */
const store = createStore(rootReducer, defaultState, applyMiddleware(alias(aliases), ReduxThunk, checkVideo, appConfig, logger));


store.subscribe(()=>{
    if(store.getState().appConfig.selectionMode === "on"){
        chrome.browserAction.setBadgeText({text: store.getState().videos.length.toString()});
    } else {
        chrome.browserAction.setBadgeText({text: ""});
    }
});

wrapStore(store, {
    portName: "YTEC"
})
