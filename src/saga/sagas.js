import { all } from 'redux-saga/effects'
import profileSaga from './profileSaga'
import postsSaga from './postsSaga'
import postSaga from './postSaga'
import commentSaga from './commentSaga'

export default function* rootSaga() {
  yield all([
    profileSaga(),
    postsSaga(),
    postSaga(),
    commentSaga()
  ])
}