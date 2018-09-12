import { combineReducers } from 'redux';
import selectionMode from './selectionMode';
import videos from './videos';

export default combineReducers({
  videos,
  selectionMode
});
