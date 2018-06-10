import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createStore from '../shared/store'
import App from '../shared/containers/App'
import reducer from '../shared/reducer'

// the `window` object before the bundle to make sure it doesn't get blocked
const initialState = window.__PRELOADED_STATE__ || {}
// once this gets loaded in, garbage collect the old `window` state
delete window.__PRELOADED_STATE__

const { history, store } = createStore(reducer, initialState)

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
