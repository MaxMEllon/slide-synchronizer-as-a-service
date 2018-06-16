import express from 'express'
import Debug from 'debug'
import bodyParser from 'body-parser'
import { matchPath } from 'react-router'

import Html from './Html'
import routesBank from '../shared/routes'
import apiGateway from './middlewares/apiGateway'

const info = Debug('app:info')

export default function renderer() {
  const app = express.Router()

  app.use(express.static('static'))
  app.use(bodyParser.json())
  app.use('/ssaas/api', apiGateway())

  app.get('*', (req, res) => {
    try {
      const { path } = routesBank.routes.find(({ path, exact }) =>
        matchPath(req.url, {
          path,
          exact,
          strict: false,
        }),
      )
      res.send(Html(path))
    } catch (err) {
      info(err)
      res.status(404).send('Not found')
    }
  })

  return app
}
