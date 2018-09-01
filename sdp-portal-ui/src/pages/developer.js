import React, {Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../css/developer.css'
import Header from '../components/header'
import config from '../property'

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            content: {},
            categories: []
        }
    }

    componentDidMount(){
        axios.get(`${config.apiURL}page/developer`)
            .then((content) => {
                this.setState({
                    content: content.data
                })
            })
        
        axios.get(`${config.apiURL}blog`)
            .then((categories) => {
                this.setState({
                    categories: categories.data
                })
            })
    }

    createCategory(category){
        return(
            <div className="developer-category" key={category._id} style={{backgroundImage:`url(${category.image.url})`}}>
                <Link to={`/devCategory/${category._id}`} className="category-cover">
                    <div className="category-content">
                        <div className="contents-extended" dangerouslySetInnerHTML={{__html: category.brief}}></div>
                    </div>
                </Link>
            </div>
        )
    }

    render(){
        const { content, categories } = this.state
        console.log(categories)
        return(
            [
                <Header />,
                <div className="page-container-developer">
                    <div className="contents-extended" dangerouslySetInnerHTML={{__html: content.content ? content.content.brief : undefined}}></div>
                    <div className="developer-categories">
                        {categories.map(this.createCategory.bind(this))}
                    </div>
                </div>
            ]
        )
    }
}