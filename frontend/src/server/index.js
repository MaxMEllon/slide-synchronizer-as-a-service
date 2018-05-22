import express from 'express'
import Debug from 'debug'
import Html from './Html'

const app = express()
const info = Debug('app:info')

app.get('/', (req, res) => res.send(Html()))

app.listen(7000, () => info('listening *:7000'))
