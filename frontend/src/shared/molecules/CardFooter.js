// @flow

import * as React from 'react'
import styled from 'styled-components'

const CardButton = styled.a``

type Props = {
  +buttonName: string,
}

export default ({ buttonName }: Props) => (
  <div className="card-footer">
    <CardButton className="card-footer-item">{buttonName}</CardButton>
  </div>
)
