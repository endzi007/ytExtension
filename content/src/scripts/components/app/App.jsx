import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/addVideo';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: ["ytd-grid-video-renderer", "ytd-watch-next-secondary-results-renderer", "ytd-playlist-panel-video-renderer", "ytd-video-renderer", "ytd-compact-video-renderer"]
    };
    this.addListeners = this.addListeners.bind(this);
    this.observerFunction = this.observerFunction.bind(this);
    this.getDomNodesOnLoad = this.getDomNodesOnLoad.bind(this);
  }
  
  addListeners(nodes){
    nodes.forEach((video)=>{
       let aTags = video.getElementsByTagName("a");
       let url = aTags[0].getAttribute("href");
       console.log(this.props, "videos in addLlisteners");
       video.addEventListener("click", (e)=>{
         if(this.props.selectionMode==="on"){
           e.preventDefault();
           e.stopPropagation();
           this.props.addOrRemoveVideo(url);
         }
       }, true)
    })
  }
  observerFunction(){ 
  // Options for the observer (which mutations to observe)
  var config = { childList: true, subtree: true };  
  // Callback function to execute when mutations are observed
  const callback = (mutationsList)=>{
      let newNodes = [];
      for(let mutation of mutationsList){
        let addedNodes = mutation.addedNodes; //object
        for(let key of addedNodes){
          if(this.state.tags.indexOf(key.nodeName.toLowerCase())!==-1){
            newNodes.push(key);
          }
        }
      }
      this.addListeners(newNodes);
  };
  
  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(callback);
  
  // Start observing the target node for configured mutations
  observer.observe(document, config);
  }

  getDomNodesOnLoad(){
    let nodes = document.querySelectorAll("ytd-grid-video-renderer", "ytd-watch-next-secondary-results-renderer", "ytd-playlist-panel-video-renderer", "ytd-video-renderer");
    this.addListeners(Array.from(nodes));
  }
  componentDidMount() {
    this.getDomNodesOnLoad();
    this.observerFunction();
  }

  render() {
    return (
      <div>
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
 
function mapDispatchToProps(dispatch){
    return bindActionCreators(actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

