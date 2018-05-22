import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import reset from 'styled-reset'

const style = () => injectGlobal`
  ${reset}
`

const Nav = styled.header`
  height: 10%;
  width: 100%;
  background-color: black;
  position: absolute;
`

const App = () => {
  style()
  return (
    <Nav />
  )
}

export default App
