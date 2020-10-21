import { combineReducers } from 'redux'
import { profileReducer } from './profileReducer'
import { postReducer } from './postReducer'
import { commentReducer } from './commentReducer'

export const rootReducer = combineReducers({
    user: profileReducer,
    post: postReducer,
    comment: commentReducer
})