import React from 'react';
import { connect } from 'react-redux';
const SingleVideo = (props)=>{
    const { video, actionDispatch } = props;
    console.log(props);
    const handleRemove = ()=>{
        actionDispatch("ADD_REMOVE_VIDEO", video);
        chrome.tabs.query({currentWindow: true, active: true}, (tabs)=>{
            chrome.tabs.sendMessage(tabs[0].id, {payload: "REMOVED_VIDEO"});
        })
    }
    const modifiedUrl = video.url.substr(9, video.url.length);
    console.log(modifiedUrl);

    const handleDownload = ()=> {
        fetch(`https://api.youtubemultidownloader.com/video?url=https://www.youtube.com/watch?v=${modifiedUrl}`).then((response)=>{
                return response.json()
            }).then((data)=>{
                console.log(JSON.stringify(data));
            });
    }
    return (
        <div style={{
            display: "flex",
            width: "100%",
            padding: "5px",
            flexDirection: "column"
        }}>
        <h5>{video.title}</h5>
        <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr"
        }}>
            <img style={{maxWidth: "100px"}}src={video.thumbnail} alt={video.title}/>
            <div style={{display: "flex", alignItems: "center", padding: "5px"}}>
                <div style={{maxWidth: "100%"}}>
                <iframe width="250px" height="30px" style={{marginTop: "5px"}} scrolling="no" src={`https://www.download-mp3-youtube.com/api/?api_key=MzE4ODAxNDcz&format=mp3&video_id=${modifiedUrl}`}>dow</iframe>
                </div>
                <div onClick={handleDownload} className="btn btn-success" style={{display: "flex", flexDirection: "column"}}><span className="glyphicon glyphicon-download">MP4</span></div>
                <div style={{marginLeft: "15px"}}onClick={handleRemove}><span className="glyphicon glyphicon-remove"></span></div>
            </div>
        </div>
            
           
        </div>
    );
};

export default SingleVideo;

/*  <a href={`https://baixaryoutube.net/@api/json/mp3/${modifiedUrl}`}>Download mp3</a>
            <a href={`https://youtubetoany.com/@api/json/mp3/${modifiedUrl}`} download="DOWNLOAD_FILE_NAME.mp4">Download dido</a> */