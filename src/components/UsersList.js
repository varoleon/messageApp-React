import React, { Component } from 'react'
import { Alert, Input } from 'reactstrap'

import { API_BASE_URL } from '../config/config'

export class UsersList extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     error: null,
        //     users: [],
        //     isLoading: false,
        //     username: ""
        // }

        this.select = this.select.bind(this)
    }

  

    select(e) {
        console.log()
        this.props.selection(e.target.innerText)
    }

    render() {
        const { error, isLoading, users } = this.props;
        console.log(users)
        if (error) {
            return (<Alert color="danger">{error.message}</Alert>)
        } else if (isLoading) {
            return <Alert color="info">Loading...</Alert>
        } else {
            return (
                
                    <div className='usersList'>
                        {users.map(user => (
                            <div className="usersList-block" key={user}
                                onClick={this.select}
                            >
                                {user}
                            </div>
                        ))}

                    </div>
                
            )
        }
    }
}