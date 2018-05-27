import React from 'react'
import styled from 'styled-components'

const Item = styled.a`
  > img#brand {
    height: 3rem;
    min-height: 3rem;
  }
`

export default () => (
  <div className="navbar-brand">
    <Item className="navbar-item">
      <img
        id="brand"
        src={`${process.env.SERVER_LOC}/assets/icon.png`}
        alt="Bulma: a modern CSS framework based on Flexbox"
      />
    </Item>
  </div>
)
