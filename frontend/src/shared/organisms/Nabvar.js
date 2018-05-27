// @flow

import React from 'react'
import NavbarBrand from '../molecules/Navbar/NavbarBrand'
import NavbarBurger from '../molecules/Navbar/NavbarBurger'
import NavbarMenu from '../molecules/Navbar/NavbarMenu'

export default () => (
  <nav className="navbar has-shadow is-spaced" aria-label="main navigation">
    <NavbarBrand />
    <NavbarBurger />
    <NavbarMenu />
  </nav>
)
