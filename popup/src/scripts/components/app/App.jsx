import React, {Component} from 'react';
import { connect } from 'react-redux';
import Playlist from '../playlist';

class App extends Component {
  constructor(props) {
    super(props);
  }
  handleChange(value){
      this.props.dispatch({type: "SELECT_MODE", payload: value})
  }
  handleDispatch(type, payload){
    this.props.dispatch({type: type, payload: payload})
  }
  render() {
    return (
      <div style={{ 
        minWidth: "400px",
        minHeight: "200px",
        padding: "10px"
        }} className="container">
        <div className="selectionMode">
        Enter selection mode: <br />
        <button onClick={this.handleChange.bind(this, "on")} className={`btn ${this.props.selectionMode==="on"? "btn-success": "btn-default"}`}>On</button>
        <button onClick={this.handleChange.bind(this, "off")} className={`btn ${this.props.selectionMode!=="on"? "btn-success": "btn-default"}`}>Off</button>
        </div>
        <Playlist dispatchAction={this.handleDispatch.bind(this)} videos={this.props.videos}/>
      </div>
    );
  }
}

function mapStateToProps(store){
  return {
    selectionMode: store.selectionMode,
    videos: store.videos
  }
}
export default connect(mapStateToProps)(App);

