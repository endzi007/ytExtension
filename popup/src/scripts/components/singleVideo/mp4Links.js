import React from 'react';

class Mp4Links extends React.Component {
    constructor(){
        super();
        this.state = {
            url: ""
        }
    }
    render(){
        if(this.props.url===""){
            return <div>loading...</div>;
        } else {
            return(
            <a href={this.props.url} className="btn btn-success" style={{display: "flex", flexDirection: "column"}} download="test">
                <span className="glyphicon glyphicon-download">MP4</span>
            </a>)
        }
    }
}                

export default Mp4Links;