import React from 'react';
import Mp4Links from './mp4Links';

const SingleVideo = (props)=>{
    const { video, actionDispatch, appConfig, index} = props;
    const handleRemove = ()=>{
        actionDispatch("ADD_REMOVE_VIDEO", video);
        chrome.tabs.query({currentWindow: true, active: true}, (tabs)=>{
            chrome.tabs.sendMessage(tabs[0].id, {payload: "REMOVED_VIDEO"});
        })
    }
    const modifiedUrl = video.url.substr(9, video.url.length);
    const displayLinks = appConfig.downloadMode === "mp3"?
    <iframe width="80%" height="30px" style={{marginTop: "5px"}} scrolling="no" src={video.links.mp3Link}></iframe>:
    <Mp4Links url={video.links.mp4Link}/>;
    let modifiedTitle = video.title.length > 58 ? `${video.title.substr(0, 55)}...`: video.title; 
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "5% 33% 62%",
            padding: "5px"
        }}>
            <div style={{ height: "100%", verticalAlign: "middle" }}>{index+1}</div>
           <img style={{maxWidth: "100%"}} src={video.thumbnail} alt={video.title}/>
           <div style={{display: "flex", flexDirection: "column"}}>
            <h5 onClick={()=>{
                    navigator.clipboard.writeText(`https://www.youtube.com${video.url}`).then((str)=>{
                        console.log(str)
                    });
                }}
                style={{margin: 0, padding: 0}}
            >{modifiedTitle}</h5>

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