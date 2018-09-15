
export const addOrRemoveVideo = (video)=>{
    return {
        type: "ADD_OR_REMOVE_VIDEO",
        payload: video
    }
}


export const addOrRemoveClass = (video)=>{
    return {
        type: "ADD_OR_REMOVE_CLASS",
        payload: video
    }
}


export const getVideos = ()=>{
    return {
        type: "GET_VIDEOS"
    }
}
