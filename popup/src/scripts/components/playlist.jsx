import React from 'react';
import SingleVideo from "./singleVideo/singleVideo";
export default (videos)=>{
    console.log("videos", videos.videos);
    let videosArray = []
    videos.videos.forEach((video) => {
        videosArray.push(<SingleVideo key={video.url} video ={video}/>);
    });
    return <div>{videosArray}</div>;
}