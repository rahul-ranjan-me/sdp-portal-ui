import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../property'
import '../css/product.css'

export default class ProductCategory extends Component{
    constructor(props){
        super(props)
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

    createProductByCategory(category, key){
        return(
            <div className="product-category" key={category._id}>
                <h2><Link to={`/productCategory/${category._id}`}>{category.name}</Link></h2>
                <div className="products">
                    <ul>
                        {category.products ? category.products.map(this.createProductsList.bind(this)) : undefined}
                    </ul>
                </div>
            </div>
        )
    }

    render(){
        const productCategory = this.props.products
        return(
            <div>{ productCategory.map(this.createProductByCategory.bind(this)) }</div>
        )
    }
}