import React, { Component } from 'react'
import $ from 'jquery'
import '../css/contactUs.css'
import Header from '../components/header'
import config from '../property'

export default class ContactUs extends Component{
    constructor(props){
        super(props)
        this.data = {
            
        }
        this.state = {
            success: null,
            error: null
        }
    }

    updateField(ev){
        this.data[ev.target.name] = ev.target.value
    }

    submitForm(ev){
        console.log(`${config.apiURL}contact`)
        ev.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/api/contact',
            data: this.data,
            method: 'post',
            dataType: 'json',
            success: (data) => { 
                {data.error ? 
                    this.setState({
                        error: data.error.detail.message,
                        success: null
                    })
                    :
                    this.setState({
                        success: true,
                        error: null
                    })
                }
            }
        })
    }

    render(){
        return(
            [
                <Header />,
                <div className="page-container-contact">
                    <h2>Contact Us</h2>
                    {this.state.success ? <p className="success-response">Your enquery is submitted successfully.</p> : undefined}
                    {this.state.error ? <p className="error-response">{this.state.error}</p> : undefined}
                    <form>
                        <ul>
                            <li>
                                <label html-for="name">Name</label>
                                <input className="form-control" type="text" name="name.full" onChange={this.updateField.bind(this)} />
                            </li>
                            <li>
                                <label html-for="email">Email</label>
                                <input className="form-control" type="email" name="email" onChange={this.updateField.bind(this)} />
                            </li>
                            <li>
                                <label html-for="phone">Phone</label>
                                <input className="form-control" type="text" name="phone" placeholder="(optional)" onChange={this.updateField.bind(this)} />
                            </li>
                            <li>
                                <label html-for="option">What are you contacting us about?</label>
                                <select className="form-control" name="enquiryType" onChange={this.updateField.bind(this)} >
                                    <option value="">(select one)</option>
                                    <option value="message">Just leaving a message</option>
                                    <option value="question">I've got a question</option>
                                    <option value="other">Something else...</option>
                                </select>
                            </li>
                            <li>
                                <label html-for="message">Message</label>
                                <textarea className="form-control" name="message" placeholder="Leave us a message..." rows="4" onChange={this.updateField.bind(this)} ></textarea>
                            </li>
                        </ul>
                        <button type="submit" onClick={this.submitForm.bind(this)}>Submit</button>
                    </form>
                </div>
            ]
        )
    }
}