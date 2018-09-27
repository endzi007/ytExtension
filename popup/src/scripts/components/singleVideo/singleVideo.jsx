import React from 'react';
import { connect } from 'react-redux';
const SingleVideo = (props)=>{
    const { video, actionDispatch } = props;
    console.log(props);
    const handleRemove = (type, payload)=>{
        actionDispatch("ADD_REMOVE_VIDEO", video);
        chrome.tabs.query({currentWindow: true, active: true}, (tabs)=>{
            chrome.tabs.sendMessage(tabs[0].id, {payload: "REMOVED_VIDEO"});
        })
    }
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
        </div>
    );
};

export default SingleVideo;