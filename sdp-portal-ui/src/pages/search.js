import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../css/search.css'
import Header from '../components/header'
import HomeBanner from '../components/homeBanner'
import ProductCategory from '../components/productCategory'
import config from '../property'

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            results: []
        }
    }

    componentDidMount(){
        axios.get(`${config.apiURL}productsSearch/${this.props.location.search}`)
            .then((data) => {
                this.setState({
                    results: data.data
                })
            })
    }

    printResults(data){
        return(
            <div className="result">
                <h3><Link to={`/products/${data._id}`}>{data.title}</Link></h3>
                <div className="contents-extended" dangerouslySetInnerHTML={{__html: data.content.brief}}></div>
            </div>
        )
    }

    render(){
        const { results } = this.state
        return(
            [
                <Header />,
                <div class="page-container-search">
                    <h2>Search results</h2>
                    <div>{results.length ? results.map(this.printResults.bind(this)) : 'No results found'}</div>
                </div>
            ]
        )
    }
}