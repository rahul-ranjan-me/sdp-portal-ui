import React, {Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../css/home.css'
import Header from '../components/header'
import config from '../property'

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            products: [],
            category: {}
        }
    }

    componentDidMount(){
        this.getData(this.props.match.params.categoryId)
    }

    componentWillReceiveProps(nextProps){
        this.getData(nextProps.match.params.categoryId)
    }

    getData(categoryId){
        axios.get(`${config.apiURL}productsCategory/${categoryId}`)
            .then((products) => {
                this.setState({
                    products: products.data
                })
            })
        axios.get(`${config.apiURL}productsCategory`)
            .then((data) => {
                var currentCategory = data.data.filter((elem) => {
                    return elem._id === categoryId
                })
                this.setState({
                    category: currentCategory[0]
                })
            })
    }

    createProductsList(product, key){
        return(
            <li key={key}>
                {product.image ? <img src={product.image.url} /> : undefined }
                <h3><Link to={`/products/${product._id}`}>{product.title}</Link></h3>
                <p>{product.brief}</p>
            </li>
        )
    }

    render(){
        const { category, products } = this.state
        
        return(
            [
                <Header />,
                <div className="page-container">
                    <h4>{category.name}</h4>
                    <ul className="products">{products.length ? products.map(this.createProductsList.bind(this)): undefined}</ul>
                </div>
            ]
        )
    }
}