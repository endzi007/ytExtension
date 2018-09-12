export const addVideo = (url)=>{
    return {
        type: "ADD_VIDEO",
        payload: url
    }
}

export const removeVideo = (url)=>{
    return {
        type: "REMOVE_VIDEO",
        payload: url
    }
}