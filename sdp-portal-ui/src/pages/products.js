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
            product: {}
        }
    }

    componentDidMount(){
        this.getData(this.props.match.params.productId)
    }

    componentWillReceiveProps(nextProps){
        this.getData(nextProps.match.params.productId)
    }

    getData(productId){
        axios.get(`${config.apiURL}products/${productId}`)
            .then((product) => {
                this.setState({
                    product: product.data
                })
            })
        
    }

    render(){
        const { product } = this.state
        return(
            [
                <Header />,
                <div className="page-container">
                    <h4>{product.title}</h4>
                    {product.image ? <img src={product.image.url} width="100%" height="200" /> : undefined}
                    <div className="contents-brief" dangerouslySetInnerHTML={{__html: product.content ? product.content.brief : undefined}}></div>
                    <div className="contents-extended" dangerouslySetInnerHTML={{__html: product.content ? product.content.extended : undefined}}></div>,
                </div>
            ]
        )
    }
}