// @flow

import * as React from 'react'
import styled from 'styled-components'
import Icon, { type IconType } from '../atoms/icons'

const IconBox = styled.span`
  width: 1.5rem !important;
  height: 1.5rem !important;
`

type Props = {
  name: string,
  label: string,
  icon: IconType,
  type: string,
  value: string,
  onChange: (e: any) => void,
}

export default ({ name, label, icon, type, value, onChange }: Props) => (
  <div className="field">
    <label htmlFor={name} className="label">
      {label}
    </label>
    <div className="control has-icons-left">
      <input id={name} type={type} className="input" value={value} onChange={onChange} />
      <IconBox className="icon is-small is-left">
        <Icon icon={icon} />
      </IconBox>
    </div>
  </div>
)
