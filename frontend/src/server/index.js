import React from 'react'
import express from 'express'
import Html from './Html'

const app = express()

app.get('/', (req, res) => res.send(Html()))

app.listen(7000, () => {
  console.log('listening *:7000')
})
