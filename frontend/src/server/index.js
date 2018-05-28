import express from 'express'
import Debug from 'debug'
import bodyParser from 'body-parser'
import { matchPath } from 'react-router'
import Html from './Html'
import routesBank from '../shared/routes'
import apiGateway from './middlewares/apiGateway'

const info = Debug('app:info')

const app = express()

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
  } catch (_err) {
    info(_err)
    res.status(404).send('Not found')
  }
})

app.listen(7000, () => info('listening *:7000'))
