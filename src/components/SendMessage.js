import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Col } from 'reactstrap'
import { API_BASE_URL } from "../config/config"
import { UsersList } from './UsersList'
import Clear from 'react-icons/lib/md/clear'

export class SendMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            receiverUsername: "",
            message: "",
            sendStatus: {
                statusMessage: "",
                pending: false,
                success: false
            },
            error: null,
            isLoading: true,
            users: [],
            filteredUsers: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSelection = this.handleSelection.bind(this)
    }

    componentDidMount() {
        const request = ({
            url: API_BASE_URL + "users",
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            })
        })
        //Get all users
        fetch(request.url, request)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        users: result,
                        filteredUsers: result,
                        isLoading: false
                    })
                },
                (error) => {
                    this.setState({
                        error,
                        isLoading: false
                    })
                }
            )
    }


    handleSelection(user) {
        this.setState(
            {
                receiverUsername: user,
                filteredUsers: [user]
            }
        )
        console.log(user)
    }

    filterUsers(name) {
        const filtered = this.state.users.filter(
            (user) => user.indexOf(name) !== -1
        )
        this.setState({ filteredUsers: filtered })
    }

    handleChange(event) {
        console.log(event.target.value);
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value })
        if (name == 'receiverUsername') {
            this.filterUsers(value)
        }

    }
    handleSubmit(event) {
        event.preventDefault()
        this.setState({
            sendStatus: {
                pending: true,
                statusMessage: "",
                success: false
            }
        })

        const msgRequest = {
            message: this.state.message,
            receiver: this.state.receiverUsername,
            id: "",
            sender: ""
        }

        this.send(msgRequest)
            .then(response => {
                this.setState({
                    sendStatus: {
                        statusMessage: "Your message has been sent succesfully!",
                        pending: false,
                        success: true
                    }
                })
            })
            .catch(error => {
                this.setState({
                    sendStatus: {
                        statusMessage: error.message,
                        pending: false,
                        success: false
                    }
                })
            })


    }

    send(msgRequest) {
        const request = {
            url: API_BASE_URL + 'message/send',
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }),
            body: JSON.stringify(msgRequest)
        }
        console.log(msgRequest)
        return fetch(request.url, request)
            .then(response =>
                response.json().then(json => {
                    if (!response.ok) {
                        return Promise.reject(json);
                    }
                    return json;
                })
            )

    }

    clearReceiver = () => {
        this.setState(
            {
                receiverUsername: "",
                filteredUsers: this.state.users
            }
        )
    }

    render() {
        return (

            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-8 col-lg-7">
                    <h4>Send Message</h4>
                    {
                        this.state.sendStatus.pending ?
                            <Alert color='info'>Sending, please wait...</Alert> :
                            this.state.sendStatus.statusMessage.length > 0 ?
                                this.state.sendStatus.success ?
                                    <Alert color='success'>{this.state.sendStatus.statusMessage}</Alert> :
                                    <Alert color='danger'>{this.state.sendStatus.statusMessage}</Alert> : null
                    }




                    <div className="row">
                        <div className="col-sm-10 offset-sm-2">
                            <div className="userList-container">

                                <UsersList selection={this.handleSelection}
                                    users={this.state.filteredUsers}
                                    isLoading={this.state.isLoading}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>




                    <Form onSubmit={this.handleSubmit} autoComplete="off">
                        <FormGroup row>

                            <Label for="password" sm={2}>
                                <span>To</span>
                            </Label>
                            <Col sm={10}>
                                <div className={`icon-clearUser ${(this.state.receiverUsername) ? "activeIcon" : null}`}>
                                    <Clear onClick={this.clearReceiver} />
                                </div>
                                <Input type="receiverUsername" id="receiverUsername" name="receiverUsername" placeholder="Username"
                                    invalid={this.state.filteredUsers.length === 0}
                                    valid={this.state.filteredUsers.includes(this.state.receiverUsername)}
                                    onChange={this.handleChange}
                                    value={this.state.receiverUsername}
                                />
                            </Col>

                            {/* <FormFeedback>{this.state.formErrors.password}</FormFeedback> */}
                        </FormGroup>

                        <FormGroup row>
                            <Label for="message" sm={2}>Message</Label>
                            <Col sm={10}>
                                <Input type="textarea" sm={10} name="message" id="message" placeholder="Your message goes here..." onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <Button type="submit" color="primary"
                             disabled={!this.state.filteredUsers.includes(this.state.receiverUsername)}>Send</Button>
                    </Form>
                </div>
            </div>
        )
    }
}