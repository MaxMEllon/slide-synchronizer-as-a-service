import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import App from '../shared/containers/App'

const renderedContent = renderToString(<App />)
const styleTags = new ServerStyleSheet().getStyleTags()

export default function renderFullPage() {
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
    <meta property="og:title" content="<%= htmlWebpackPlugin.options.title %>" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://example.com" />
    ${styleTags}
  </head>
  <body>
    <div id="root">${renderedContent}</div>
    <script type="text/javascript" src="${process.env.CLIENT_JS_LOC}/client.js"></script>
    <script type="text/javascript" src="${process.env.CLIENT_JS_LOC}/vendor.client.js"></script>
  </body>
</html>
  `
}
