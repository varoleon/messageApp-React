import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Col } from 'reactstrap'
import { UsersList } from '../users/UsersList'
import { getAllUsersRequest, sendMessageRequest } from '../utils/Utils'

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
        const request = getAllUsersRequest();
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

        const msgReqBody = {
            message: this.state.message,
            receiver: this.state.receiverUsername,
            id: "",
            sender: ""
        }

        // this.send(msgReqBody)
        const request = sendMessageRequest(msgReqBody)
        fetch(request.url, request)
            .then(res => res.json())
            .then(response => {
                this.setState({
                    sendStatus: {
                        statusMessage: "Your message has been sent succesfully!",
                        pending: false,
                        success: true
                    },
                    message: ""
                })
                this.clearReceiver();
            }),
            (error => {
                this.setState({
                    sendStatus: {
                        statusMessage: error.message,
                        pending: false,
                        success: false
                    }
                })
            })

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

            <div >
                
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
                        <div className="col">
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
                                <div className={`icon-clearUser ${(this.state.receiverUsername) ? "activeIcon" : ""}`}
                                    onClick={this.clearReceiver} >
                                    <i className="fas fa-times"></i>
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
                                <Input type="textarea" sm={10} name="message" id="message" placeholder="Your message goes here..." onChange={this.handleChange} value={this.state.message} />
                            </Col>
                        </FormGroup>
                        <Button type="submit" color="primary" className="ml-auto d-flex"
                            disabled={!this.state.filteredUsers.includes(this.state.receiverUsername)}>Send</Button>
                    </Form>
                </div>

        )
    }
}