import React from 'react'

import { NavLink } from 'react-router-dom'
// import '../stylesheets/menu.css'


export const Menu = () =>
    <ul id="menu">
        <li><NavLink exact to="/" activeClassName='selected' >Home</NavLink></li>
        <li><NavLink to="/messages" activeClassName='selected'>Messages</NavLink></li>
        <li><NavLink to="/sendmsg" activeClassName='selected'>Send message</NavLink></li>
    </ul>