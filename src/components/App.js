import React, { Component } from 'react'
import { Button, Row, Col } from 'reactstrap'
import { NavLink, Redirect } from 'react-router-dom'
import { logout } from '../utils/Utils'
import { WelcomePage } from './WelcomePage';
import { LoginRegisterPanel } from '../authentication/LoginRegisterPanel';
import { SendMessage } from '../messages/SendMessage';
import { API_BASE_URL } from '../config/config'
import { MessageReader } from '../messages/MessageReader'
import { Menu } from './Menu';
import { EditMessage } from '../messages/EditMessage';
import { AdminPanel } from './AdminPanel';
import { UserListDetails } from '../users/UsersListDetails';
import { MainHeader } from './MainHeader';
import { LayoutBody } from './LayoutBody';




export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logedUser: {
                name: null,
                username: null,
                email: null,
                roles: []
            },
            error: null,
            isLoading: false,
            showSend: false
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleMsgClassToggle = this.handleMsgClassToggle.bind(this);
    }
    componentDidMount() {
        if (localStorage.getItem('accessToken')) {
            this.setState({ isLoading: true })
            this.handleLogin()
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
                            email: result.email,
                            roles: result.roles
                        },
                        isLoading: false
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
        logout()

        this.setState({
            logedUser: {
                username: null,
                name: null,
                email: null,
                roles: []
            }
        })

    }

    handleMsgClassToggle() {
        if (this.state.showSend) {
            this.setState({ showSend: false })
        } else {
            this.setState({ showSend: true })
        }
    }

    render() {
        if (this.state.logedUser.username === null && !this.state.isLoading) {
            return (<LoginRegisterPanel handleLogin={this.handleLogin} />)

        } else {
            return (
                (!this.state.isLoading) ?

                    <div>
                        <div className="container ">
                            <Row>
                                <Col>
                                    <MainHeader user={this.state.logedUser}
                                        handleLogout={this.handleLogout} />
                                </Col>
                            </Row>
                            {/* <LayoutBody user={this.state.logedUser}/> */}
                            <Row id="layoutBody" className="no-gutters">
                                <Menu user={this.state.logedUser} />
                                <Col sm={9}>
                                    <div id="mainContent">
                                        {
                                            this.props.location.pathname === "/" ?

                                                <WelcomePage />
                                                :
                                                this.props.location.pathname === "/sendmsg" ?
                                                    <SendMessage />
                                                    :
                                                    (this.props.location.pathname === "/messages") ?
                                                        <div className="messagesContentainer">
                                                            <Button color="info" className="msgToggler" onClick={this.handleMsgClassToggle}>Received / Sent</Button>
                                                            <div className="msgBoard">
                                                                <div className={this.state.showSend ? "showSend" : ""}>
                                                                    <h3>Received Messages</h3>
                                                                    <MessageReader msgType="received" />
                                                                </div>
                                                                <div className={this.state.showSend ? "showSend" : ""}>
                                                                    <h3>Sent Messages</h3>
                                                                    <MessageReader msgType="sent" />
                                                                </div>
                                                            </div>
                                                        </div> :
                                                        (this.props.location.pathname === "/adminpanel") ?
                                                            <AdminPanel roles={this.state.logedUser.roles} /> :
                                                            null
                                        }
                                    </div>
                                </Col>

                            </Row>
                            {/*<h3>Welcome {this.state.logedUser.username}</h3>
                            Your roles are: {this.state.logedUser.roles}
                            <Button onClick={this.handleLogout} size="sm" color="primary" outline >Log out</Button> */}
                            {/* <UserListDetails /> */}
                        </div>

                        {/* <EditMessage message={msg}/> */}


                    </div> :
                    <div className="container">
                        <div>
                            {this.state.error !== null ?
                                <div>
                                    <h3> Error </h3>
                                    {this.state.error.message}
                                </div> :
                                "loading..."
                            }
                        </div>
                    </div>
            )
        }

    }

}