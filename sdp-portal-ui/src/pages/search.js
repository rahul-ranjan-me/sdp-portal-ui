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
        axios.get(`${config.apiURL}search/${this.props.location.search}`)
            .then((data) => {
                this.setState({
                    results: data.data
                })
            })
    }

    printResults(resultCategory){
        return this.state.results[resultCategory].map((data) => {
            const linkTo = resultCategory === 'developerResult' ? `/devCategory/${data.categories[0]}`  : `/products/${data._id}`
            return(
                <div className="result" key={data._id}>
                    <h3><Link to={linkTo}>{data.title}</Link></h3>
                    <div className="contents-extended" dangerouslySetInnerHTML={{__html: data.content.brief}}></div>
                </div>
            )
        })
    }

    render(){
        const { results } = this.state
        return(
            [
                <Header />,
                <div className="page-container-search">
                    <h2>Search results</h2>
                    <div>{Object.keys(results).length ? Object.keys(results).map(this.printResults.bind(this)) : 'No results found'}</div>
                </div>
            ]
        )
    }
}