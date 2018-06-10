import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'react-router-redux'

import rootSaga from './sagas'

const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools({}) : compose

export default (reducer, initialState, fromServer) => {
  const history = fromServer ? createMemoryHistory() : createBrowserHistory()

  // generate middlewares
  const sagaMiddleware = createSagaMiddleware()
  const initalizedRouterMiddleware = routerMiddleware(history)

  // regist middlewares
  const middlewares = []
  middlewares.push(sagaMiddleware)
  middlewares.push(initalizedRouterMiddleware)

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  )

  sagaMiddleware.run(rootSaga)

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./ducks/common', () => store.replaceReducer(require('./ducks/common')))
    }
  }

  return { history, store }
}
