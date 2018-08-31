import React, { Component } from 'react'
import '../css/header.css'

import Search from './search'
import Nav from './nav'

export default class Header extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <header className="header">
                <h1>SDP Portal</h1>
                <Search />
                <Nav products={this.props.products} />
            </header>
        )
    }
}