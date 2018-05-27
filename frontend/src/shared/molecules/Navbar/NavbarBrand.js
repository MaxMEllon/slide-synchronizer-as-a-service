import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Item = styled(Link)`
  > img#brand {
    height: 3rem;
    min-height: 3rem;
  }
`

export default () => (
  <div className="navbar-brand">
    <Item className="navbar-item" to="/">
      <img
        id="brand"
        src={`${process.env.SERVER_LOC}/assets/icon.png`}
        alt="Bulma: a modern CSS framework based on Flexbox"
      />
    </Item>
  </div>
)
