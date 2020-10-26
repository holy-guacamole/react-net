import { put, takeLatest } from 'redux-saga/effects'

function* showComments() {
    let response = yield fetch('https://postify-api.herokuapp.com/comments', { 
        method: "GET",
        headers: new Headers ({
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    let data = yield response.json()
    data.sort(function(a, b){return (b.created_at < a.created_at)?-1:1})
    yield put({type: 'SHOW_COMMENTS', payload: data})
}

function* showComment(action) {
    let response = yield fetch(`https://postify-api.herokuapp.com/comments/${action.body}`, { 
        method: "GET",
        headers: new Headers ({
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    let comment = yield response.json()
    yield put({type: 'SHOW_COMMENT', payload: comment})
}

function* addComment(action) {
    let response = yield fetch(`https://postify-api.herokuapp.com/comments`, { 
        method: "POST",
        body: JSON.stringify(action.body.body),
        headers: new Headers ({
            'content-type': 'application/json',
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    yield response.json()
    yield put({type: 'FETCH_SHOW_COMMENTS'})
}

function* saveComment(action) {
    let response = yield fetch(`https://postify-api.herokuapp.com/comments/${action.body.id}`, { 
        method: "PUT",
        body: JSON.stringify(action.body.message),
        headers: new Headers ({
            'content-type': 'application/json',
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    yield response.json()
    yield put({type: 'FETCH_SHOW_COMMENTS'})
}

function* deleteComment(action) {
   let id = JSON.stringify(action.body)
    let response = yield fetch(`https://postify-api.herokuapp.com/comments/${id}`, { 
        method: "DELETE",
        headers: new Headers ({
            'access-token': localStorage.getItem("access-token"),
            'client': localStorage.getItem("client"),
            'uid': localStorage.getItem("uid")
        })
    })
    yield response
    yield put({type: 'FETCH_SHOW_COMMENTS'})
}

export default function* commentSaga() {
    yield takeLatest('FETCH_SHOW_COMMENTS', showComments)
    yield takeLatest('FETCH_SHOW_COMMENT', showComment)
    yield takeLatest('FETCH_ADD_COMMENT', addComment)
    yield takeLatest('FETCH_SAVE_COMMENT', saveComment)
    yield takeLatest('FETCH_DELETE_COMMENT', deleteComment)
}