import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const logger = createLogger()

const middlewares = []
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools({}) : compose

export default (reducer: {}) => {
  const store = createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)))
  return store
}
