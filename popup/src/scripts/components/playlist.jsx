import React from 'react';
import SingleVideo from "./singleVideo/singleVideo";
export default class extends React.Component{
    render(){
        const { dispatchAction, videos } = this.props;
        console.log("dispatch", dispatchAction);
        let videosArray = []
        videos.forEach((video) => {
            videosArray.push(<SingleVideo actionDispatch={dispatchAction} key={video.url} video ={video}/>);
        });
        return <div>{videosArray}</div>;
    }
}