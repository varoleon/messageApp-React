import React, { Component } from 'react'
import { API_BASE_URL } from '../config/config'
import CallMade from 'react-icons/lib/md/call-made'
import CallReceived from 'react-icons/lib/md/call-received'

export class MessageReader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            isLoading: true,
            error: null
        }
    }

    componentDidMount() {
        if (localStorage.getItem('accessToken')) {
            this.setState({
                isLoading: true
            })
            this.getMessages()
        }
    }
    getMessages() {
        const msgType = this.props.msgType
        const request = ({
            url: API_BASE_URL + "message/" + msgType + "messages",
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            })
        })

        fetch(request.url, request)
            .then(res => res.json())
            .then(
                (result) => this.setState({
                    messages: result.sort((a, b) => a.id - b.id).reverse(),
                    isLoading: false
                }),
                (error) => this.setState({
                    isLoading: false,
                    error
                })
            )
    }

    drawMsgHeader(sender, receiver) {
        if (this.props.msgType === 'received') {
            return (
                <div className="message__header">
                    <div className="person">from: <span>{sender}</span></div>
                    <div className="icon"><CallReceived /></div>
                </div>
            )
        } else if (this.props.msgType === 'sent') {
            return (
                <div className="message__header">
                    <div className="person">to: <span>{receiver}</span></div>
                    <div className="icon"><CallMade /></div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.state.messages.map(
                    message =>
                        <div key={message.id} className='message'>

                            {this.drawMsgHeader(message.sender, message.receiver)}

                            <div className="message__body">
                                {message.message}
                            </div>
                            <div className="message__tools">
                                some tools here
                            </div>
                        </div>
                )}
            </div>
        )
    }
}