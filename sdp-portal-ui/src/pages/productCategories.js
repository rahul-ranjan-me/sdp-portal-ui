import React, {Component} from 'react'
import axios from 'axios'
import '../css/home.css'
import Header from '../components/header'
import ProductCategory from '../components/productCategory'
import config from '../property'

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            products: [],
            productsContent: {}
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

        axios.get(`${config.apiURL}page/products`)
            .then((data) => {
                this.setState({
                    productsContent: data.data
                })
            })
    }

    render(){
        const { products, productsContent } = this.state
        return(
            [
                <Header />,
                <div className="contents-extended" dangerouslySetInnerHTML={{__html: productsContent.content ? productsContent.content.extended : undefined}}></div>,
                <ProductCategory products={products} />
            ]
        )
    }
}