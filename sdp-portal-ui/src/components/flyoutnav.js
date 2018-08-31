import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../property'

export default class FlyoutNav extends Component{
    constructor(props){
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount(){
        var items = []
        axios.get(`${config.apiURL}productsCategory`)
            .then((data) => {
                const allCategories = data.data
                allCategories.map((item, key) => {
                items[key] = item
                axios.get(`${config.apiURL}productsCategory/${item._id}`)
                    .then((products) => {
                    items[key].products = products.data
                    this.setState({
                        products: items
                    })
                    })
                })
            })
    }

    createProduct(category, key){
        return(
            <li key={category._id}>
               <Link to={`/productCategory/${category._id}`}>{category.name}</Link>
               <div className="expand-menu" style={{backgroundImage:`url(${category.image.url})`}}>
                    <ul>
                        {category.products ? category.products.map(this.createProducts.bind(this)) : undefined}
                    </ul>
                </div>
            </li>
        )
    }

    createProducts(product, key){
        return(
            <li key={key}><Link to={`/products/${product._id}`}>{product.title}</Link></li>
        )
    }

    render(){
        return(
            <div className="flyoutNav">
                <span className="stamp">Proudct by Category</span>
                <ul>
                    {this.state.products.length ? this.state.products.map(this.createProduct.bind(this)): undefined}
                </ul>
            </div>
        )
    }
}