export const checkVideo = (store)=>(next)=>(action)=>{
    switch(action.type){
        case "ADD_REMOVE_VIDEO":
            let videos = store.getState().videos;
            if(videos.length > 0){
                let found = videos.findIndex((video, i)=>{
                    return video.url === action.payload.url;
                });
                if(found !== -1){
                    action.type="REMOVE_VIDEO";
                    action.payload=found;
                } else {
                    action.type="ADD_VIDEO";
                }
            } else {
                action.type = "ADD_VIDEO";
            }
            break;
        default: 
        break;
    }
    next(action);
}