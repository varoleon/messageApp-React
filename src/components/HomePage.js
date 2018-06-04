import React, { Component } from 'react'
import { UserCard } from '../users/UserCard'

export class HomePage extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div>
                <h3>Welcome to CB4Messages</h3>
                {/* <UserCard user={this.props.user}/> */}
            </div>
        )
    }
}
