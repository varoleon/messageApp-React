
import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { logout } from '../authentication/Logout';
import { WelcomePage } from './WelcomePage';
import { LoginRegisterPanel } from '../authentication/LoginRegisterPanel';
import { SendMessage } from './SendMessage';
import { API_BASE_URL } from '../config/config'


export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logedUser: {
                name: null,
                username: null,
                email: null
            },
            error: null
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    componentDidMount() {
        if (localStorage.getItem('accessToken')) {
            this.getCurrentUser();
        }
    }

    getCurrentUser() {
        const request = ({
            url: API_BASE_URL + "users/about/me",
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            })
        });

        fetch(request.url, request)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        logedUser: {
                            name: result.name,
                            username: result.username,
                            email: result.email
                        }
                    })
                },
                (error) => {
                    this.setState({
                        error
                    })
                }
            )
    }

    handleLogin() {
        this.getCurrentUser()
    }
    handleLogout() {
        logout
        this.setState({
            logedUser: {
                username: null,
                name:null,
                email:null
            }
        })
    }
    render() {
        if (this.state.logedUser.username === null) {
            return (<LoginRegisterPanel handleLogin={this.handleLogin} />)

        } else {
            return (

                <div className="container">
                    <h3>Welcome {this.state.logedUser.username}</h3>
                    <Button onClick={this.handleLogout}>Log out</Button>
                    <SendMessage />
                </div>
            )
        }




    }

}
// export const MainApp = () =>

//     <div className="container">
//         {!(localStorage.getItem('accessToken')) ? <WelcomePage /> :


//             <Button onClick={logout}>Log me out</Button>
//         }

//     </div>