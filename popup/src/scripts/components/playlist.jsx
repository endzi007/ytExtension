import React from 'react';
import SingleVideo from "./singleVideo/singleVideo";
export default class extends React.Component{
    render(){
        const { dispatchAction, videos, appConfig } = this.props;
        let videosArray = []
        videos.forEach((video) => {
            videosArray.push(<SingleVideo appConfig = {appConfig} actionDispatch={dispatchAction} key={video.url} video ={video}/>);
        });
        return <div>{videosArray}</div>;
    }
}