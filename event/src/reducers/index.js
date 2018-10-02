import { combineReducers } from 'redux';
import appConfig from './appConfig';
import videos from './videos';

export default combineReducers({
  videos,
  appConfig
});
