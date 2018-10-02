export default {
    "GET_VIDEOS": (originalAction)=>{
        return (dispatch, getState)=>{
            return { type: originalAction, payload: getState().videos};
        }
    },
    "FETCH_MP4_LINKS": (originalAction)=>{
        let url = originalAction.payload.url;
        let videoId = url.substr(9, url.length);
        return (dispatch, getState)=>{
            fetch(`https://api.youtubemultidownloader.com/video?url=https://www.youtube.com/watch?v=${videoId}`).then((response)=>{
                return response.json()
            }).then((data)=>{
                let obj = data.format.find((form)=>{
                    return form.ext === "mp4";
                })
                fetch(obj.url).then((res)=>{
                    let storeVideos = getState().videos;
                    let index = storeVideos.findIndex((video)=>{
                        return video.url === originalAction.payload.url;
                    });
                    console.log(index);
                    dispatch({type: "FETCH_MP4_LINKS_OK", payload: {index: index, finalUrl: res.url}});
                });
            });
        }
    }
}

