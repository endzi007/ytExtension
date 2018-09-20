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

chrome.webNavigation.onHistoryStateUpdated.addListener(function (data){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {payload: "changed"}, function(){});
    });
});


const store = createStore(rootReducer, defaultState, applyMiddleware(alias(aliases), ReduxThunk, checkVideo, logger));

wrapStore(store, {
    portName: "YTEC"
})
