import React, { Component } from 'react'
import { Menu } from './Menu'
import { Row,Button } from 'reactstrap'


export class LayoutBody extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="layoutBody">
                <Row>
                    <Menu user={this.props.user} />
                </Row>
                <Row>
                    {
                        this.props.location.pathname === "/sendmsg" ?
                            <div className="container">
                                <SendMessage />
                            </div>
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
                </Row>
            </div>
        )
    }

}