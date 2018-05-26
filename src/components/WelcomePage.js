import React from 'react'

export const WelcomePage = (props) =>
    <div className="container">
        <h1>Welcome to the application!{props.filter}</h1>
    </div>