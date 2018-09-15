export default {
    "GET_VIDEOS": (originalAction)=>{
        return (dispatch, getState)=>{
            return { type: originalAction, payload: getState().videos};
        }
    }
}