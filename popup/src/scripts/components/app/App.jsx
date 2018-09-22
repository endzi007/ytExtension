import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Playlist from '../playlist';

class App extends Component {
  constructor(props) {
    super(props);
  }
  handleChange(value){
      this.props.dispatch({type: "SELECT_MODE", payload: value})
  }
  render() {
    console.log(this.props.selectionMode, "selection mode");
    return (
      <div className="container">
        <div className="selectionMode">
        Enter selection mode: <br />
        <Button onClick={this.handleChange.bind(this, "on")} bsStyle={this.props.selectionMode==="on"? "success": "default"}>On</Button>
        <Button onClick={this.handleChange.bind(this, "off")} bsStyle={this.props.selectionMode!=="on"? "success": "default"}>Off</Button>
        </div>
        <Playlist videos={this.props.videos}/>
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

