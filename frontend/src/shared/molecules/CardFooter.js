// @flow

import * as React from 'react'
import styled from 'styled-components'

const CardButton = styled.a``

type Props = {
  +buttonName: string,
  +onSubmit: Function,
}

export default ({ buttonName, onSubmit }: Props) => (
  <div className="card-footer" onClick={onSubmit}>
    <CardButton className="card-footer-item">{buttonName}</CardButton>
  </div>
)
