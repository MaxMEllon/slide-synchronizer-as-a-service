// @flow

import * as React from 'react'
import styled from 'styled-components'
import CardContent from './CardContent'
import * as icons from '../atoms/icons'

const IconBox = styled.span`
  width: 1.5rem !important;
  height: 1.5rem !important;
`

export default () => (
  <CardContent
    Content={
      <div className="content">
        <div className="field">
          <label htmlFor="name" className="label">
            名前
          </label>
          <div className="control has-icons-left">
            <input id="name" type="text" className="input" />
            <IconBox className="icon is-small is-left">
              <icons.User />
            </IconBox>
          </div>
        </div>

        <div className="field">
          <label htmlFor="email" className="label">
            E-mail
          </label>
          <div className="control has-icons-left">
            <input id="email" type="email" className="input" />
            <IconBox className="icon is-small is-left">
              <icons.Email />
            </IconBox>
          </div>
        </div>

        <div className="field">
          <label htmlFor="password" className="label">
            パスワード
          </label>
          <p className="control has-icons-left">
            <input id="password" type="password" className="input" />
            <IconBox className="icon is-small is-left">
              <icons.Key />
            </IconBox>
          </p>
        </div>

        <div className="field">
          <label htmlFor="passwordConfirmation" className="label">
            パスワード確認
          </label>
          <p className="control has-icons-left">
            <input id="passwordConrirmation" type="password" className="input" />
            <IconBox className="icon is-small is-left">
              <icons.Key />
            </IconBox>
          </p>
        </div>
      </div>
    }
  />
)
