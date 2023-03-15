import { FetchingEvents } from "./actionType"
const baseUrl = 'http://localhost:3000'
// const baseUrl = 'https://challenge1.dikyardiyanto.site'

export const fetchEvents = (payload) => {
    return { type: FetchingEvents, payload }
}


export const getEvents = () => {
    return (dispatch) => {
        fetch(baseUrl + '/events', {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                access_token: localStorage.access_token 
            },
        })
            .then(resp => resp.json())
            .then(data => dispatch(fetchEvents(data)))
            .catch(error => console.log(error))
    }
}


export const login = (formLogin) => {
    return (dispatch) => {
        return fetch(baseUrl + '/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formLogin)
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    return resp.json().then((error) => {
                        throw new Error(error.message);
                    })
                }
            })
            .then(data => {
                console.log(data)
                localStorage.setItem("access_token", data.access_token)
            })
    }
}

export const googleLogin = (formLogin) => {
    return (dispatch) => {
        return fetch(baseUrl + '/google-login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formLogin)
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    return resp.json().then((error) => {
                        throw new Error(error);
                    })
                }
            })
            .then(data => {
                localStorage.setItem("access_token", data.access_token)
            })
    }
}

export const register = (formRegister) => {
    return (dispatch) => {
        return fetch(baseUrl + '/adminregister', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formRegister)
        })
        .then(resp => {
            if (resp.ok) {
                return resp.json()
            } else {
                return resp.json().then((error) => {
                    throw new Error(error.message);
                })
            }
        })
    }
}