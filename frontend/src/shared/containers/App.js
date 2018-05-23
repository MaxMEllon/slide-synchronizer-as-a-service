// @flow

import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import reset from 'styled-reset'
import routeBank from '../routes'

const style = () => injectGlobal`
  ${reset}
`

const Nav = styled.header`
  height: 50px;
  width: 100%;
  background-color: black;
  position: absolute;
`

const Spacer = styled.div`
  height: 50px;
  width: 100%;
`

const routes = routeBank.routes.map((props, i) => <Route key={i} {...props} />)

const App = () => {
  style()
  return (
    <div>
      <Nav />
      <Spacer />
      <Switch>{routes}</Switch>
    </div>
  )
}

export default App
