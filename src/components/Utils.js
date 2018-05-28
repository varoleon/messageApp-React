import { API_BASE_URL } from "../config/config";

export const logout = () => {
    localStorage.getItem('accessToken') ?
        localStorage.removeItem('accessToken') : null
}

export const getAllUsersRequest = () => {
    const request = ({
        url: API_BASE_URL + "users",
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        })
    })
    return request
}

export const getMessagesRequest = (msgType) => {
    // const msgType = this.props.msgType
    const request = ({
        url: API_BASE_URL + "message/" + msgType + "messages",
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        })
    })

    return request;
}

export const deleteMessageRequest = (id) => {
    const request = ({
        url: API_BASE_URL + "message/deletemessage/" + id,
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        })
    })

    return request
}

export const sendMessageRequest = (reqBody) => {
    const request = {
        url: API_BASE_URL + 'message/send',
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }),
        body: JSON.stringify(reqBody)
    }
    return request
}