import React, {Component} from 'react';
import { connect } from 'react-redux';
import Playlist from '../playlist';

class App extends Component {
  constructor(props) {
    super(props);
  }
  handleChange(value, meta){
    //meta is used in middleware to split action for select mode, or download mode...
      this.props.dispatch({type: "APP_CONFIG", payload: {payload: value, meta:meta}})
  }
  handleDispatch(type, payload){
    this.props.dispatch({type: type, payload: payload})
  }
  render() {
    const { selectionMode, downloadMode } = this.props.appConfig;
    return (
      <div style={{ 
        minWidth: "400px",
        minHeight: "200px",
        padding: "10px"
        }} className="container">
        <div className="selectionMode" style={{
          display: "flex",
          fontSize: "0.8em",
          justifyContent: "space-between"
        }}>
        <div>
          Enter selection mode: <br />
          <button onClick={this.handleChange.bind(this, "on", "SELECT_MODE")} className={`btn btn-small ${selectionMode==="on"? "btn-success": "btn-default"}`}>On</button>
          <button onClick={this.handleChange.bind(this, "off", "SELECT_MODE")} className={`btn btn-small ${selectionMode!=="on"? "btn-success": "btn-default"}`}>Off</button>
        </div>
        <div>    
          Choose download mode: <br />
          <button onClick={this.handleChange.bind(this, "mp3", "DOWNLOAD_MODE")} className={`btn btn-small ${downloadMode==="mp3"? "btn-success": "btn-default"}`}>MP3</button>
          <button onClick={this.handleChange.bind(this, "mp4", "DOWNLOAD_MODE")} className={`btn btn-small ${downloadMode!=="mp3"? "btn-success": "btn-default"}`}>MP4</button>
        </div>
        </div>
        <Playlist appConfig = {this.props.appConfig} dispatchAction={this.handleDispatch.bind(this)} videos={this.props.videos}/>
      </div>
    );
  }
}

function mapStateToProps(store){
  return {
    appConfig: store.appConfig,
    videos: store.videos
  }
}
export default connect(mapStateToProps)(App);

