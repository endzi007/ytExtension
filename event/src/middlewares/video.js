import { addVideo, removeVideo } from '../actions/videoStoreActions';
export const checkVideo = (store)=>(next)=>(action)=>{
    switch (action.type) {
        case "ADD_OR_REMOVE_VIDEO":
            let videos = store.getState().videos;
            if(videos.indexOf(action.payload)===-1){
                action.type = "ADD_VIDEO"
                next(action);
            } else {
                if(videos.length !== 0){
                    action.type = "REMOVE_VIDEO";
                    next(action);
                } else{
                    next(action);
                }
            }  
            break;
        default:
            next(action);
            break;
    }
    
}