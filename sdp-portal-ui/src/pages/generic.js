import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../css/generic.css'
import Header from '../components/header'
import HomeBanner from '../components/homeBanner'
import ProductCategory from '../components/productCategory'
import config from '../property'

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            pageData: null
        }
    }

    componentDidMount(){
        axios.get(`${config.apiURL}page/${this.props.match.params.pageName}`)
            .then((data) => {
                this.setState({
                    pageData: data.data
                })
            })
    }

    render(){
        const { pageData } = this.state
        return(
            [
                <Header />,
                <div>{ pageData ? 
                    <div class="page-container-generic">
                        <h2>{pageData.title}</h2>
                        {pageData.image ? <div className="generic-banner-image" style={{backgroundImage: `url(${pageData.image.url})`}}></div> : undefined}
                        <div className="contents-brief" dangerouslySetInnerHTML={{__html: pageData.content ? pageData.content.brief : undefined}}></div>
                        <div className="contents-extended" dangerouslySetInnerHTML={{__html: pageData.content ? pageData.content.extended : undefined}}></div>
                    </div> : undefined}</div>
            ]
        )
    }
}