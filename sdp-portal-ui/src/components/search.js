import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Search extends Component{
    constructor(props){
        super(props)
        this.searchQuery = null
    }

    navigate(ev){
        ev.preventDefault();
        window.location.href = `/search?search=${this.searchQuery}`
    }

    updateSearchQuery(ev){
        this.searchQuery = ev.target.value
    }

    render(){
        return(
            <div className="search-box">
                <form>
                    <input type="search" placeholder="Search our product" onChange={this.updateSearchQuery.bind(this)}/>
                    <button type="submit" onClick={this.navigate.bind(this)}>Go</button>
                </form>
            </div>
        )
    }
}