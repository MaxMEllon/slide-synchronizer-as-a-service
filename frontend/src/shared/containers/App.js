// @flow

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal } from 'styled-components'
import reset from 'styled-reset'
import Nav from '../organisms/Nabvar'
import routeBank from '../routes'

const style = () => injectGlobal`
  ${reset}
`

const routes = routeBank.routes.map((props, i) => <Route key={i} {...props} />)

const App = () => {
  return (
    <div>
      <Nav />
      <section className="section">
        <div className="container is-fluid">
          <Switch>{routes}</Switch>
        </div>
      </section>
    </div>
  )
}

export default App
