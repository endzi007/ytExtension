import React from 'react';

const SingleVideo = (video)=>{
    console.log(video);
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr"
        }}>
            <img src={video.video.thumbnail} alt={video.video.title}/>
            <h2>{video.video.title}</h2>
        </div>
    );
};

export default SingleVideo;