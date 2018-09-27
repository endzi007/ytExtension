import React from 'react';
import SingleVideo from "./singleVideo/singleVideo";
export default (videos)=>{
    let videosArray = []
    videos.videos.forEach((video) => {
        videosArray.push(<SingleVideo dispatch={dispatch} key={video.url} video ={video}/>);
    });
    return <div>{videosArray}</div>;
}