import React from 'react';
import { connect } from 'react-redux';
const SingleVideo = (props)=>{
    const { video, actionDispatch } = props;
    console.log(props);
    const handleRemove = ()=>{
        actionDispatch("ADD_REMOVE_VIDEO", video);
        chrome.tabs.query({currentWindow: true, active: true}, (tabs)=>{
            chrome.tabs.sendMessage(tabs[0].id, {payload: "REMOVED_VIDEO"});
        })
    }

    const handleDownload = ()=>{
        //youtube - mp3 api is https://baixaryoutube.net/en/
        actionDispatch("DOWNLOAD_VIDEO", video);
    }
    const modifiedUrl = video.url.substr(9, video.url.length);
    console.log(modifiedUrl);
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            gridGap: "7px",
            width: "100%",
            padding: "5px",
            borderBottom: "1px solid gray"
        }}>
            <img 
                style={{
                    maxWidth: "100px"
                }}
            src={video.thumbnail} alt={video.title}/>
            <h5>{video.title}</h5>
            <div onClick={handleRemove}>delete</div>
            <div onClick={handleDownload}>download</div>
            <a href={`https://baixaryoutube.net/@api/json/mp3/${modifiedUrl}`}>Download mp3</a>
            <a href="https://r2---sn-huxaqvv-ubqe.googlevideo.com/videoplayback?api=youtubemultidownloader.com&clen=26895912&ip=2a03%3Ab0c0%3A2%3Ad0%3A%3Ad5b%3Ae001&dur=121.520&gir=yes&c=WEB&ipbits=0&requiressl=yes&lmt=1538064862949002&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&keepalive=yes&pl=24&mime=video%2Fmp4&source=youtube&key=cms1&txp=5533432&expire=1538097984&sparams=aitags,clen,dur,ei,expire,gir,id,ip,ipbits,itag,keepalive,lmt,mime,mip,mm,mn,ms,mv,pl,requiressl,source&itag=137&ei=4C6tW_DgJ8bT1gKI1bO4DA&id=o-AMXq72dMwL1wzg8ylQ8tu3OUJl4bCBIrc9S8LC2IQ-XQ&signature=18E3153B0C28127EC4874C1ABE70B237BCADED8D.5DAC098A6A03EF7D55F3F0CABE30BDE1202091EA&fvip=2&ratebypass=yes&title=Kumare+-+Horoskop&cms_redirect=yes&mip=62.4.55.210&mm=31&mn=sn-huxaqvv-ubqe&ms=au&mt=1538076320&mv=m" download="DOWNLOAD_FILE_NAME.mp4">Download dido</a>
        </div>
    );
};

export default SingleVideo;