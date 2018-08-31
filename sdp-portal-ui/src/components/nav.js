import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FlyoutNav from './flyoutnav'
import axios from 'axios'
import config from '../property'

export default class Nav extends Component{
    constructor(props){
        super(props);
        this.state = {
            nav : []
        }
    }

    componentDidMount(){
        axios.get(`${config.apiURL}nav`)
            .then((data) => {
                this.setState({
                    nav: data.data
                })
            })
    }

    createFlatNav(navItem, key){
        return(
            <li key={key}><Link to={navItem.href}>{navItem.label}</Link></li>
        )
    }

    render(){
        return(
            <div className="top-nav">
                <FlyoutNav products={this.props.products} />
                <ul className="flat-nav">
                    {this.state.nav.map(this.createFlatNav.bind(this))}
                </ul>
            </div>
        )
    }
}