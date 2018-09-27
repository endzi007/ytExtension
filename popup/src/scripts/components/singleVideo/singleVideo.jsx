import React from 'react';

const SingleVideo = (video, dispatch)=>{
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
            src={video.video.thumbnail} alt={video.video.title}/>
            <h5>{video.video.title}</h5>
            
        </div>
    );
};


export default SingleVideo;