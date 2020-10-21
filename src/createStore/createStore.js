import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from '../reducer/rootReducer'
import rootSaga from '../saga/sagas'

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware), 
)
sagaMiddleware.run(rootSaga);