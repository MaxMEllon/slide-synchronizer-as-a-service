import React from 'react'
import { render } from 'react-dom'
import App from '~/containers/App'

const initalRender = () => render(<App />, document.body)

document.addEventListener('DOMContentLoaded', initalRender)
