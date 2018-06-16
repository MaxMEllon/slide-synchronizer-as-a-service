const http = require('http')
const express = require('express')
const errorhandler = require('errorhandler')

const dev = process.env.NODE_ENV === 'development'
const server = http.createServer()
const debug = require('debug')('ssaas:debug')

function createApp() {
  const app = express()

  return devServer(app).then(() => {
    app.use((req, res) => res.status(404).send('Not found'))

    if (dev) {
      app.use(errorhandler())
    } else {
      app.use((err, req, res, next) => {
        res.status(500).send('Internal Server Error')
      })
    }

    return app
  })
}

function devServer(app) {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
  const clientConfig = require('../src/webpack/webpack.config.client.dev')
  const serverConfig = require('../src/webpack/webpack.config.server.dev')

  const multiCompiler = webpack([clientConfig, serverConfig])
  const clientCompiler = multiCompiler.compilers[0]

  app.use(webpackDevMiddleware(multiCompiler, { serverSideRender: true }))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(multiCompiler))

  return new Promise((resolve, reject) => multiCompiler.plugin('done', () => resolve()))
}

createApp()
  .then((app) => {
    server.on('request', app)
    const port = process.env.PORT || 7000
    server.listen(port, () => debug(`Listening on port ${port}`))
  })
  .catch((err) => {
    debug(err)
    process.exit(1)
  })
