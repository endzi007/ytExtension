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
            let url = video.getElementsByTagName("a")[0].getAttribute("href");
            let thumbnailSrc = video.getElementsByTagName("img")[0].getAttribute("src");
            let title = video.querySelector("#video-title").getAttribute("title");
            let videoToAdd = {title: title, thumbnail: thumbnailSrc, url: url, links: {
              mp3Link: `https://www.download-mp3-youtube.com/api/?api_key=MzE4ODAxNDcz&format=mp3&video_id=${url.substr(9, url.length)}`,
              mp4Link: ""
            }};
            if(this.props.appConfig.selectionMode==="on"){
              e.preventDefault();
              e.stopPropagation();
              let found = this.props.videos.findIndex((vidUrl)=>{
                return vidUrl.url === url;
              });
              if(found===-1){
                video.classList.add("selectedVideo");
              } else {
                video.classList.remove("selectedVideo");
              }
              this.props.addRemoveVideo(videoToAdd);
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
          let found = this.props.videos.findIndex((video)=>{
            return video.url === url;
          });
          if(found !==-1){
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
      observer.disconnect();
    });
    document.getElementsByTagName("body")[0].addEventListener("yt-navigate-finish", (event)=> {
        this.props.getVideos().then(()=>{
          this.getDomNodesOnLoad();
          observer.observe(document, {childList: true, subtree: true});
        });
    });
    chrome.extension.onMessage.addListener((message, sender, response)=>{
      switch (message.payload) {
        case "REMOVED_VIDEO":
          let domNodes = Array.from(document.querySelectorAll(this.state.tags));
          for(let node of domNodes){
            this.addClasses(node);
          }
          break;
        default:
          break;
      }
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
      appConfig: store.appConfig,
      videos: store.videos
    }
}
 
function mapDispatchToProps(dispatch){
    return bindActionCreators(actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

