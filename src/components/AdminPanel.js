import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { UserListDetails } from '../users/UsersListDetails';
import { AddRemoveRole } from '../users/AddRemoveRole';
import { MessageReader } from '../messages/MessageReader';

export class AdminPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userEditing: null,
            showMsg: false
        }
        this.selectUser = this.selectUser.bind(this)
        this.showMessages = this.showMessages.bind(this)
        this.onEditRole = this.onEditRole.bind(this)
        this.closeUserCard = this.closeUserCard.bind(this)
    }

    selectUser(user) {
        this.setState({
            userEditing: user,
            showMsg: false
        })
    }

    unusedRoles(used) {
        const allRoles = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_GOD']
        const unused = allRoles.filter((item) => {
            return !used.includes(item)
        })
        return unused.map(role => <li key={role}>{role.substring(5)}</li>)
    }
    showMessages() {
        this.setState({
            showMsg: true
        })
    }
    onEditRole(user){
        this.setState({userEditing: user})
    }

    closeUserCard(){
        this.setState({userEditing : null})
    }

    render() {

        if (this.props.roles.indexOf('ROLE_ADMIN') != -1 ||
            this.props.roles.indexOf('ROLE_GOD') != -1) {
            return (
                <div>
                    <h3>Admin Panel</h3>
                    {this.state.userEditing == null ? <UserListDetails onSelect={this.selectUser} /> :
                        <div>
                            <div onClick={this.closeUserCard}>close</div>
                            <div>Username : {this.state.userEditing.username}</div>
                            <div>Name : {this.state.userEditing.name}</div>
                            <div>Email : {this.state.userEditing.email}</div>
                            <div>Roles : <ul>{this.state.userEditing.roles.map(role =>
                                <li key={role}>{role.substring(5)}</li>
                            )}</ul></div>
                            {/* <div>Has Not
                                <ul>{this.unusedRoles(this.state.userEditing.roles)}</ul>
                            </div> */}

                        </div>
                    }
                    {this.state.userEditing != null ?
                        <div>
                            <AddRemoveRole user={this.state.userEditing} onEditRole={this.onEditRole}/>
                            <div onClick={this.showMessages}>show Messages</div>
                            {this.state.showMsg ?
                                <div className="">
                                    <MessageReader msgType="received" username={this.state.userEditing.username} />
                                    <MessageReader msgType="sent" username={this.state.userEditing.username} />
                                </div> : null
                            }
                        </div>
                        : null}
                </div>

            )

        } else {
            return <Redirect to="/" />
        }
    }

}
