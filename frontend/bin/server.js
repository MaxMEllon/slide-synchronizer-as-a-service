const fs = require('fs')
const path = require('path')
const serve = require('webpack-serve')
const history = require('connect-history-api-fallback')
const convert = require('koa-connect')
const config = require('../src/webpack/webpack.config.dev')

config.serve = {
  content: [process.cwd()],
  hot: {
    host: 'localhost',
    port: 5000,
  },
  port: 4000,
  add: (app, middleware, options) => {
    app.use(convert(history({})))
  }
}

serve({ config })
