import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { ConnectedRouter, push } from 'react-router-redux'
import { Provider } from 'react-redux'

import App from '../shared/containers/App'
import createStore from '../shared/store'
import { reducer, initialState } from '../shared/ducks/common'

export default function renderFullPage(path) {
  const styleTags = new ServerStyleSheet().getStyleTags()
  const { history, store } = createStore(reducer, initialState, true)
  const state = store.getState()
  store.dispatch(push(path))
  const renderedContent = renderToString(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
  )
  return `
<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
    <meta charset="UTF-8">
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,minimum-scale=0.5,maximum-scale=3,minimal-ui"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="theme-color" content="#317EFB" />
    <meta property="og:title" content="title" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://example.com" />
    ${styleTags}
  </head>
  <body>
    <div id="root">${renderedContent}</div>
    <script
      async
      type="text/javascript"
      src="/static/client.js"
    ></script>
    <script
      async
      type="text/javascript"
      src="/static/vendor.client.js"
    ></script>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
    </script>
  </body>
</html>
  `
    .trim()
    .split('\n')
    .map((l) => l.replace(/(^\s+)|(\s+$)/g, ''))
    .join('\n')
}
