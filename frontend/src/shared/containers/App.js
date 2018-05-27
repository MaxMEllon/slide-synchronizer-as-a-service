// @flow

import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal } from 'styled-components'
import reset from 'styled-reset'
import Nav from '../organisms/Nabvar'
import routeBank from '../routes'

const style = () => injectGlobal`
  ${reset}
`

const routes = routeBank.routes.map((props, i) => <Route key={i} {...props} />)

const App = (): React.Node => {
  style()
  return (
    <React.Fragment>
      <Nav />
      <Switch>{routes}</Switch>
    </React.Fragment>
  )
}

export default App
