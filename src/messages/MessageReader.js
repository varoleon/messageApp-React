import React, { Component } from 'react'
import { getMessagesRequest, deleteMessageRequest } from '../utils/Utils'

import { EditMessage } from './EditMessage';

export class MessageReader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            isLoading: true,
            editMode: false,
            editResponse: {
                id: "",
                message: ""
            },
            error: null
        }
        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.onSuccessEdit = this.onSuccessEdit.bind(this)
        this.onFailEdit = this.onFailEdit.bind(this)
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
        const request = getMessagesRequest(this.props.msgType,this.props.username)
        console.log(request)
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

    drawEditResponse(id) {
        // alert (this.state.editResponse.id == id);
        if (this.state.editResponse.id == id
            && this.state.editResponse.message.length > 0) {
            return (
                <div className="editResponse">
                    {this.state.editResponse.message}
                </div>
            )

        }
    }

    drawMsgHeader(sender, receiver, id) {
        if (this.props.msgType === 'received') {
            return (
                <div className="message__header">
                    <div className="person">from: <span>{sender}</span></div>
                    {this.drawEditResponse(id)}
                    <div className="icon"><i className="fas fa-arrow-down"></i></div>
                </div>
            )
        } else if (this.props.msgType === 'sent') {
            return (
                <div className="message__header">
                    <div className="person">to: <span>{receiver}</span></div>
                    {this.drawEditResponse(id)}
                    <div className="icon"><i className="fas fa-arrow-up"></i></div>
                </div>
            )
        }
    }

    handleEdit(e) {
        const id = e.target.getAttribute('data-key')
        if (this.state.editMode == id) {
            this.setState({ editMode: "" })
        } else {
            this.setState({ editMode: id })
        }
    }

    handleDelete(e) {
        //TODO confirmation
        const id = e.target.getAttribute('data-key')
        const request = deleteMessageRequest(id)

        fetch(request.url, request)
            .then(res => res.json())
            .then(
                (result) => {
                    this.removeMsgFromList(id)
                },
                (error) => {
                    this.setState({
                        editResponse: {
                            id: id,
                            message: "Delete error: " + error.message
                        }
                    })
                })
    }
    removeMsgFromList(id) {
        let msgListCopy = this.state.messages.slice()
        const index = msgListCopy.indexOf(this.state.messages.find(msg => msg.id == id))
        // ?lert (index);
        if (index > -1) {
            msgListCopy.splice(index, 1)
        }
        this.setState({
            messages: msgListCopy
        })
    }

    onSuccessEdit(id, txt) {
        const msgListCopy = this.state.messages.slice();
        const index = msgListCopy.indexOf(this.state.messages.find(msg => msg.id == id))
        msgListCopy[index].message = txt;
        this.setState({
            editMode: "",
            editResponse: {
                id: id,
                message: "Updated successfully"
            },
            messages: msgListCopy
        })

    }

    onFailEdit(id, txt) {
        this.setState({
            editMode: "",
            editResponse: {
                id: id,
                message: "Update fail: " + txt
            },
        })

    }

    render() {
        return (
            <div>
            {this.props.username}
                {this.state.messages.map(
                    message =>
                        <div key={message.id} className='message'>

                            {this.drawMsgHeader(message.sender, message.receiver, message.id)}

                            <div className="message__body">
                                {this.state.editMode == message.id ?
                                    <EditMessage message={message}
                                        onSuccess={this.onSuccessEdit}
                                        onFailure={this.onFailEdit}
                                    /> :
                                    message.message}
                            </div>
                            <div className="message__tools">
                                {this.state.editMode != message.id ?
                                    <div><i data-key={message.id} onClick={this.handleEdit} className="fas fa-edit"></i></div> :
                                    <div><i data-key={message.id} onClick={this.handleEdit} className="fas fa-times"></i></div>
                                }
                                <div ><i data-key={message.id} onClick={this.handleDelete} className="fas fa-trash-alt"></i></div>
                            </div>
                        </div>
                )}
            </div>
        )
    }
}