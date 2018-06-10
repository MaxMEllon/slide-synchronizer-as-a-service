// @flow

import * as React from 'react'
import LoadingBar from 'react-redux-loading-bar'
import reset from 'styled-reset'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal } from 'styled-components'

import Nav from '../organisms/Nabvar'
import Notification from '../organisms/Notification'
import bulma from '../../server/macros/bulma.macro'
import routeBank from '../routes'

const resetStyle = () => injectGlobal`
  ${reset}
`

const bulmaStyle = () => injectGlobal`
  ${bulma}
`

const routes = routeBank.routes.map((props, i) => <Route key={i} {...props} />)

const App = (): React.Node => {
  resetStyle()
  bulmaStyle()
  return (
    <React.Fragment>
      <LoadingBar style={{ zIndex: 400000 }} />
      <Nav />
      <Switch>{routes}</Switch>
      <Notification />
    </React.Fragment>
  )
}

export default App
