
export const removeVideo = (video)=>{
    return {
        type: "REMOVE_VIDEO",
        payload: video
    }
}

export const addVideo = (video)=>{
    return {
        type: "ADD_VIDEO",
        payload: video
    }
}

export const getVideos = ()=>{
    return {
        type: "GET_VIDEOS"
    }
}
