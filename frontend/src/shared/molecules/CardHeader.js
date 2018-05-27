// @flow

import * as React from 'react'

type Props = {
  +title: string,
}

export default ({ title }: Props) => (
  <header className="card-header-title">
    <p className="card-header-title">{title}</p>
  </header>
)
