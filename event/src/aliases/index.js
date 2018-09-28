export default {
    "GET_VIDEOS": (originalAction)=>{
        return (dispatch, getState)=>{
            return { type: originalAction, payload: getState().videos};
        }
    },
    "DOWNLOAD_VIDEO": (originalAction)=>{
        return (dispatch, getState)=>{
            fetch(`https://api.youtubemultidownloader.com/video?url=https://www.youtube.com${originalAction.payload.url}`).then((response)=>{
                return response.json()
            }).then((data)=>{
                console.log(JSON.stringify(data));
            });
        }
    }
}