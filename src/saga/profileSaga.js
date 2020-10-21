import { put, takeLatest } from 'redux-saga/effects'

function* loginUser(action) {
    let response = yield fetch('https://postify-api.herokuapp.com/auth/sign_in',
        {
            method: "POST",
            body: JSON.stringify(action.body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
    let access_token = response.headers.get('access-token')
    let client_token = response.headers.get('client')
    let uid_token = response.headers.get('uid')
    localStorage.setItem("access-token", access_token)
    localStorage.setItem("client", client_token)
    localStorage.setItem("uid", uid_token)
    let data = yield response.json()
    yield put({type: 'SET_REDIRECT', payload: {redirect: true}})
}

function* registerUser(action) {
    let response = yield fetch('https://postify-api.herokuapp.com/auth',
        {
            method: "POST",
            body: JSON.stringify(action.body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
    let access_token = response.headers.get('access-token')
    let client_token = response.headers.get('client')
    let uid_token = response.headers.get('uid')
    localStorage.setItem("access-token", access_token)
    localStorage.setItem("client", client_token)
    localStorage.setItem("uid", uid_token)
    let data = yield response.json()
    yield put({type: 'SET_REDIRECT', payload: {redirect: true}})
}

function* profileUser() {
    let response = yield fetch('https://postify-api.herokuapp.com/users/me',
        {
            method: "GET",
            headers: {
                'access-token': localStorage.getItem("access-token"),
                'client': localStorage.getItem("client"),
                'uid': localStorage.getItem("uid")
            }
        })
    let access_token = response.headers.get('access-token')
    let client_token = response.headers.get('client')
    let uid_token = response.headers.get('uid')
    localStorage.setItem("access-token", access_token)
    localStorage.setItem("client", client_token)
    localStorage.setItem("uid", uid_token)
    let data = yield response.json()
    yield put({type: 'PROFILE_USER', payload: data.data})
}

export default function* userSaga() {
    yield takeLatest('FETCH_LOGIN_USER', loginUser)
    yield takeLatest('FETCH_REGISTER_USER', registerUser)
    yield takeLatest('FETCH_USER_PROFILE', profileUser)
}