import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Redirect } from 'react-router'

export class MainHeader extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <header className="d-flex justify-content-between align-items-center mainHeader">
                <div className="logo">
                <i className="fas fa-comment"></i>
                </div >
                <h4>Hello {this.props.user.username}</h4>
                <div className="point" onClick={this.props.handleLogout} >Log out</div>
            </header >
        )
    }
}