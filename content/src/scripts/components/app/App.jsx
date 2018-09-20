import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/addVideo';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [
        "ytd-grid-video-renderer", 
        "ytd-watch-next-secondary-results-renderer", 
        "ytd-playlist-panel-video-renderer", 
        "ytd-video-renderer", 
        "ytd-compact-video-renderer"
      ]
    };
    this.addListeners = this.addListeners.bind(this);
    this.observerFunction = this.observerFunction.bind(this);
    this.getDomNodesOnLoad = this.getDomNodesOnLoad.bind(this);
    this.addOrRemoveClass = this.addOrRemoveClass.bind(this);
  }
  
  addListeners(video){
      if(this.state.tags.indexOf(video.nodeName.toLowerCase()!==-1)){
        video.addEventListener("click", (e)=>{
          let aTags = video.getElementsByTagName("a");
          let url = aTags[0].getAttribute("href");
          if(this.props.selectionMode==="on"){
            e.preventDefault();
            e.stopPropagation();
            this.props.addOrRemoveVideo(url);
          }
        }, true)
      }      
  }
  observerFunction(){ 
  // Options for the observer (which mutations to observe)
  var config = { childList: true, subtree: true };  
  // Callback function to execute when mutations are observed
  const callback = (mutationsList)=>{
      for(let mutation of mutationsList){
        let addedNodes = mutation.addedNodes; //object
        let removedNodes = mutation.removedNodes;
        for(let key of addedNodes){
          if(this.state.tags.indexOf(key.nodeName.toLowerCase())!==-1){
            this.addListeners(key);
            this.addOrRemoveClass(key);
          }
        }
      }
  };
  
  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(callback);
  
  // Start observing the target node for configured mutations
  observer.observe(document, config);
  }

  addOrRemoveClass(node){
    let url = node.getElementsByTagName("a")[0].getAttribute("href");
    if(this.props.videos.indexOf(url)!==-1){
      node.classList.add("selectedVideo");
    } else {
      if(node.classList.contains("seletedVideo")){
        node.classList.remove("selectedVideo");
      }
    }
  }

  observePageChange(){
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse)=>{
        console.log(request);
        this.getDomNodesOnLoad();
      });
  }
  getDomNodesOnLoad(){
    let nodes = Array.from(document.querySelectorAll(this.state.tags));
    for (let node of nodes){
      this.addListeners(node);
      this.addOrRemoveClass(node);
    }
  }
  componentDidMount() {
    this.props.getVideos().then(()=>{
      this.getDomNodesOnLoad();
      this.observerFunction();
    });
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

