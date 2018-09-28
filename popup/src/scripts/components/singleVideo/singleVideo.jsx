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
    const handleDownload = ()=>{
        fetch(`https://youtubetoany.com/@api/json/mp3/${modifiedUrl} HTTP/1.1`).then((response)=>{
            console.log("[response]",response)
            return response.json();
        }).then((data)=>{
            console.log(JSON.stringify(data));
        });
    }
    
    const downloadLinks = video.links.forEach(link => {
        return <div>{link}</div>
    });
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            gridGap: "7px",
            width: "100%",
            padding: "5px",
            borderBottom: "1px solid gray"
        }}>
            <img 
                style={{
                    maxWidth: "100px"
                }}

            src={video.thumbnail} alt={video.title}/>
            <h5>{video.title}</h5>
            <div onClick={handleRemove}>delete</div>
            <div onClick={handleDownload}>download</div>
            <div style={{maxWidth: "100%"}}>
            <iframe width="250px" height="60px" scrolling="no" src={`https://www.download-mp3-youtube.com/api/?api_key=MzE4ODAxNDcz&format=mp3&video_id=${modifiedUrl}`}></iframe>
            </div>
           
        </div>
    );
};

export default SingleVideo;

/*  <a href={`https://baixaryoutube.net/@api/json/mp3/${modifiedUrl}`}>Download mp3</a>
            <a href={`https://youtubetoany.com/@api/json/mp3/${modifiedUrl}`} download="DOWNLOAD_FILE_NAME.mp4">Download dido</a> */