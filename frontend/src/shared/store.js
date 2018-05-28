import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from './sagas'

const logger = createLogger()
const sagaMiddleware = createSagaMiddleware()

const middlewares = []
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}
middlewares.push(sagaMiddleware)

const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools({}) : compose

export default (reducer: {}) => {
  const store = createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)))
  sagaMiddleware.run(rootSaga)
  return store
}
