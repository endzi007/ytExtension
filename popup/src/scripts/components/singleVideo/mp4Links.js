import React from 'react';

class Mp4Links extends React.Component {
    constructor(){
        super();
        this.state = {
            url: ""
        }
    }
    handleDownload(){
        fetch(`https://api.youtubemultidownloader.com/video?url=https://www.youtube.com/watch?v=${this.props.url}`).then((response)=>{
                return response.json()
            }).then((data)=>{
                let obj = data.format.find((form)=>{
                    return form.ext === "mp4";
                })
                fetch(obj.url).then((res)=>{
                    this.setState({
                        url: res.url
                    })
                });
            });
    }
    componentDidMount(){
        this.handleDownload();
    }
    render(){
        if(this.state.url===""){
            return <div>loading...</div>;
        } else {
            return(
            <a href={this.state.url} className="btn btn-success" style={{display: "flex", flexDirection: "column"}} download="test">
                <span className="glyphicon glyphicon-download">MP4</span>
            </a>)
        }
    }
}                

export default Mp4Links;