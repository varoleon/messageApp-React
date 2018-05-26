import React from 'react'

import { NavLink } from 'react-router-dom'
// import '../stylesheets/menu.css'


export const Menu = () =>
    <ul id="menu">
        <li><NavLink to="/" >Home</NavLink></li>
        <li><NavLink to="/signup" activeClassName='selected'>Sign Up</NavLink></li>
        <li><NavLink to="/sendmsg" activeClassName='selected'>Send message</NavLink></li>
    </ul>