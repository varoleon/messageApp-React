import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'
// import '../stylesheets/menu.css'


export class Menu extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="col-sm-3" >
                <div id="sidebar">
                    <div id="menu" className="d-flex flex-sm-column justify-content-around justify-content-sm-start">
                        <NavLink exact to="/" activeClassName='selected' >
                            <div className="navItem">
                                <span className="d-md-block">Home</span>
                                <i class="fas fa-home"></i>
                            </div>
                        </NavLink>
                        <NavLink to="/messages" activeClassName='selected'>
                            <div className="navItem">
                                <span className="d-md-block">Messages</span>
                                <i class="fas fa-envelope"></i>
                            </div>
                        </NavLink>
                        <NavLink to="/sendmsg" activeClassName='selected'>
                            <div className="navItem">
                                <span className="d-md-block">Send Message</span>
                                <i class="fab fa-telegram-plane"></i>
                            </div>
                        </NavLink>
                        {
                            this.props.user.roles.includes('ROLE_ADMIN') || this.props.user.roles.includes('ROLE_GOD') ?
                                <NavLink to="/adminpanel" activeClassName='selected'>
                                    <div className="navItem">
                                        <span className="d-md-block">Admin panel</span>
                                        <i class="fas fa-wrench"></i>
                                    </div>
                                </NavLink> : null
                        }
                    </div>
                </div>

            </div>
        )
    }

}