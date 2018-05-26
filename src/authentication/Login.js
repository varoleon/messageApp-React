
import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback, Alert } from 'reactstrap'
import { API_BASE_URL } from '../config/config'
import { Redirect } from 'react-router-dom'


export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usernameOrEmail: "",
            password: "",
            isLoading: false,
            success: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleMessage = this.handleMessage.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    login(loginRequest) {
        const request = ({
            url: API_BASE_URL + "auth/signin",
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(loginRequest)
        });

        return fetch(request.url, request)
            .then(response =>
                response.json().then(json => {
                    if (!response.ok) {
                        return Promise.reject(json);
                    }
                    return json;
                })
            );
    }

    handleMessage(msg) {
        this.props.msghandler(msg)
    }
    handleLogin(){
        this.props.handleLogin()
    }

    handleSubmit(event) {
        event.preventDefault();
        this.handleMessage({
            type: "info",
            message: "Loading. Plese Wait..."
        })

        const loginRequest = {
            usernameOrEmail: this.state.usernameOrEmail,
            password: this.state.password
        }

        this.login(loginRequest)
            .then(response => {
                localStorage.setItem('accessToken', response.accessToken)
                console.log(localStorage.getItem('accessToken'))
                this.handleMessage({
                    type: "success",
                    message: "Successful login"
                })
                this.setState({ success: true })
                this.handleLogin()
            })
            .catch(error => {
                this.handleMessage({
                    type: "danger",
                    message: "Login failed"
                })
            })
    }

    handleChange = (event) => {
        console.log(event.target.name)
        const name = event.target.name
        const value = event.target.value

        this.setState({ [name]: value })
        // this.setState({ [name]: value },
        // () => { this.validateField(name, value) });
    }

    // validateField(fieldName, value) {
    //     let usernameOrEmailValid;
    //     let passwordValid;
    //     switch (fieldName) {
    //         case 'usernameOrEmail':
    //             usernameOrEmailValid = value.length>0;
    //             this.setState({ usernameOrEmailValid: usernameOrEmailValid })
    //             break;
    //         case 'password':
    //             passwordValid = value.length >= 6;
    //             this.setState({ passwordValid: passwordValid })
    //             break;
    //     }

    // }

    render() {
        return (

            // this.state.success ? <Redirect to="/" /> :

                <div className="container">



                    <Form onSubmit={this.handleSubmit} autoComplete="off">

                        <FormGroup>
                            <Input type="text" name="usernameOrEmail" id="usernameOrEmail" placeholder="Username or Email"
                                onChange={this.handleChange}
                            // invalid={
                            //         (!this.state.usernameOrEmailValid)                 
                            // } 
                            />
                            <FormFeedback>Required</FormFeedback>
                            <Label for="userameOrEmail" >Username or Email</Label>
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" name="password" id="password" placeholder="Password"
                                onChange={this.handleChange} />
                            <Label for="password">Password</Label>
                        </FormGroup>
                        <Button type="submit" color="primary"
                            disabled={!(this.state.usernameOrEmail.length > 0 && this.state.password.length > 0)}>
                            Login</Button>
                    </Form>

                </div>

        )
    }
}