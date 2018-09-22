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
        "ytd-playlist-panel-video-renderer", 
        "ytd-video-renderer", 
        "ytd-compact-video-renderer"
      ],
      counter: 0
    };
    this.addListeners = this.addListeners.bind(this);
    this.observerFunction = this.observerFunction.bind(this);
    this.getDomNodesOnLoad = this.getDomNodesOnLoad.bind(this);
    this.addClasses = this.addClasses.bind(this);
  }
  
  addListeners(video){
      if(this.state.tags.indexOf(video.nodeName.toLowerCase()!==-1)){
        if(video.classList.contains("addedListener")===false){
          video.addEventListener("click", (e)=>{
            video.classList.add("addedListener");
            let aTags = video.getElementsByTagName("a");
            let url = aTags[0].getAttribute("href");
            if(this.props.selectionMode==="on"){
              e.preventDefault();
              e.stopPropagation();
              if(this.props.videos.indexOf(url)!==-1){
                this.props.removeVideo(url);
                video.classList.remove("selectedVideo");
              } else {
                this.props.addVideo(url);
                video.classList.add("selectedVideo");
              }
            }
          }, true)
        }
      }      
  }
  observerFunction(mutationsList){ 
      for(let mutation of mutationsList){
        let addedNodes = mutation.addedNodes; //object
        for(let key of addedNodes){
          if(this.state.tags.indexOf(key.nodeName.toLowerCase())!==-1){
            this.addListeners(key);
            this.addClasses(key);
          }
        }
      }
  }

  addClasses(node){
    if(node !== undefined){
      if(this.state.tags.indexOf(node.nodeName.toLowerCase()!==-1)){
          let url = node.getElementsByTagName("a")[0].getAttribute("href");
          if(this.props.videos.indexOf(url)!==-1){
            node.classList.add("selectedVideo");
          } else {
            node.classList.remove("selectedVideo");
          }
      }
    }
  }
  getDomNodesOnLoad(){
    let nodes = Array.from(document.querySelectorAll(this.state.tags));
    for (let node of nodes){
      this.addListeners(node);
      this.addClasses(node);
    }
  }
  componentDidMount() {
    let observer = new MutationObserver(this.observerFunction);
    this.props.getVideos().then(()=>{
        this.getDomNodesOnLoad();
        observer.observe(document, {childList: true, subtree: true});
    }); 
    document.getElementsByTagName("body")[0].addEventListener("yt-navigate-start", (event)=> {
      this.getDomNodesOnLoad(false)
      observer.disconnect();
    });
    document.getElementsByTagName("body")[0].addEventListener("yt-navigate-finish", (event)=> {
        this.props.getVideos().then(()=>{
          this.getDomNodesOnLoad();
          //observer.observe(document, {childList: true, subtree: true});
        });
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

