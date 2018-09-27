export const addRemoveVideo = (video)=>{
    return {
        type: "ADD_REMOVE_VIDEO",
        payload: video
    }
}

export const getVideos = ()=>{
    return {
        type: "GET_VIDEOS"
    }
}
