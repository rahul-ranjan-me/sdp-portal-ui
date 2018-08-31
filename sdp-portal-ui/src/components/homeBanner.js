import React, { Component } from 'react';

export default class HomeBanner extends Component{
    render(){
        const data = this.props.data
        return(
            <div className="banner">
                <div className="contents" dangerouslySetInnerHTML={{__html: data.content ? data.content.brief : undefined}}>
                    
                </div>
                {data.image ? <div className="banner-image" style={{backgroundImage: `url(${data.image.url})`}}></div> : undefined}
                
            </div>
        )
    }
}