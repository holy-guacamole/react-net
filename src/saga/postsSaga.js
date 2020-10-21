import { put, takeLatest } from 'redux-saga/effects'

function* posts() {
    let response = yield fetch("https://postify-api.herokuapp.com/posts", 
        { 
            method: "GET",
            headers: {
                'access-token': localStorage.getItem("access-token"),
                'client': localStorage.getItem("client"),
                'uid': localStorage.getItem("uid")
            }
        })
        let data = yield response.json()
        data.sort(function(a, b){return (b.created_at < a.created_at)?-1:1})
        yield put({type: 'POST_LIST', payload: data})
}

export default function* postsSaga() {
    yield takeLatest('FETCH_POST_LIST', posts)
}

export { posts }