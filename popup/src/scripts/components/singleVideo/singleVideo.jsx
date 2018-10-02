import React from 'react';
import Mp4Links from './mp4Links';

const SingleVideo = (props)=>{
    const { video, actionDispatch, appConfig } = props;
    console.log(props);
    const handleRemove = ()=>{
        actionDispatch("ADD_REMOVE_VIDEO", video);
        chrome.tabs.query({currentWindow: true, active: true}, (tabs)=>{
            chrome.tabs.sendMessage(tabs[0].id, {payload: "REMOVED_VIDEO"});
        })
    }
    const modifiedUrl = video.url.substr(9, video.url.length);
    const displayLinks = appConfig.downloadMode === "mp3"?
    <iframe width="250px" height="30px" style={{marginTop: "5px"}} scrolling="no" src={video.links.mp3Link}></iframe>:
    <Mp4Links url={modifiedUrl}/>;
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            padding: "5px"
        }}>
            <img src={video.thumbnail} alt={video.title}/>
           <div style={{display: "flex", flexDirection: "column"}}>
            <h5>{video.title}</h5>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px"}}>
                <div style={{maxWidth: "100%"}}>
                {displayLinks}
                </div>
                <div style={{marginLeft: "15px"}}onClick={handleRemove}><span className="glyphicon glyphicon-remove"></span></div>
            </div>
           </div>
        </div>
            
    );
};

export default SingleVideo;

/*  <a href={`https://baixaryoutube.net/@api/json/mp3/${modifiedUrl}`}>Download mp3</a>
            <a href={`https://youtubetoany.com/@api/json/mp3/${modifiedUrl}`} download="DOWNLOAD_FILE_NAME.mp4">Download dido</a> */