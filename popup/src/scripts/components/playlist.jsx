import React from 'react';

export default (videos)=>{
    console.log("videos", videos.videos);
    let videosArray = []
    videos.videos.forEach(video => {
        videosArray.push(<div>{`https://www.youtube.com${video}`}</div>);
    });
    return <div>{videosArray}</div>;
}