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
            category: {},
            posts: [],
            currentPost: {},
            selectedPost: 0
        }
    }

    componentDidMount(){
        axios.get(`${config.apiURL}blog/${this.props.match.params.categoryId}`)
            .then((category) => {
                this.setState({
                    category: category.data.category,
                    posts: category.data.posts,
                    currentPost: category.data.posts[0] || []
                })
            })
    }
    
    createLeftNav(post, key){
        return(
            <li key={key} className={key === this.state.selectedPost ? 'selected' : undefined} onClick={() => {
                this.setState({
                    currentPost: this.state.posts[key],
                    selectedPost : key
                })    
            }}>{post.title}</li>
        )
    }

    render(){
        const { category, posts, currentPost } = this.state
        
        return(
            [
                <Header />,
                <div className="page-container-developer">
                    <h2>{category.name}</h2>
                    <div className="content-container">
                        <div className="left-menu">
                            <ul>
                                {posts.map(this.createLeftNav.bind(this))}
                            </ul>
                        </div>
                        <div className="content">
                            <h3>{currentPost.title}</h3>
                            <div className="image"><img src={currentPost.image ? currentPost.image.url : undefined} /></div>
                            <div className="contents-extended" dangerouslySetInnerHTML={{__html: currentPost.content ? currentPost.content.brief : undefined}}></div>
                            <div className="contents-extended" dangerouslySetInnerHTML={{__html: currentPost.content ? currentPost.content.extended : undefined}}></div>
                        </div>
                    </div>
                </div>
            ]
        )
    }
}