import { addVideo, removeVideo } from '../actions/videoStoreActions';
export const checkVideo = (store)=>(next)=>(action)=>{
    next(action);
}