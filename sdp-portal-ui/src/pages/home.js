import React, {Component} from 'react'
import axios from 'axios'
import '../css/home.css'
import Header from '../components/header'
import HomeBanner from '../components/homeBanner'
import ProductCategory from '../components/productCategory'
import config from '../property'

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            products: [],
            home: {}
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

        axios.get(`${config.apiURL}page/home`)
            .then((data) => {
                this.setState({
                    home: data.data
                })
            })
    }

    render(){
        const { products, home } = this.state
        return(
            [
                <Header />,
                <HomeBanner data={home} />,
                <div className="contents-extended" dangerouslySetInnerHTML={{__html: home.content ? home.content.extended : undefined}}></div>,
                <ProductCategory products={products} />
            ]
        )
    }
}