import React, { Component } from 'react'
import { Form, Input, Button } from 'reactstrap'
import { editMsgRequest } from '../utils/Utils'

export class EditMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            pending: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        this.setState({ text: this.props.message.message })
    }

    handleChange(e) {
        this.setState({ text: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({ pending: true })
        const editRequestBody = {
            message: this.state.text,
            receiver: this.props.message.receiver,
            sender: this.props.message.sender,
            id: this.props.message.id
        }
        console.log(editRequestBody)

        const request = editMsgRequest(editRequestBody)

        fetch(request.url, request)
            .then(res => res.json())
            .then(response => {
                this.setState({
                    pending: false
                })
                this.props.onSuccess(this.props.message.id, this.state.text)
            }),
            (error => {
                this.setState({
                    pending: false,
                    error
                })
                this.props.onFailure(this.props.message.id, error.message)
            })
    }



    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Input type='textarea' name='editMsg' className="mb-2" rows={4} value={this.state.text} onChange={this.handleChange} />
                    <Button type="submit" size="sm" color="success" outline>Edit</Button>
                </Form>

            </div>


        )
    }

}