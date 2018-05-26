// @flow

import React from 'react'
import styled from 'styled-components'
import NavbarBrand from '../molecules/NavbarBrand'
import NavbarBurger from '../molecules/NavbarBurger'
import NavbarMenu from '../molecules/NavbarMenu'

export default () => (
  <nav className="navbar has-shadow is-spaced" aria-label="main navigation">
    <NavbarBrand />
    <NavbarBurger />
    <NavbarMenu />
  </nav>
)
