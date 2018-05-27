// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Email, User, Key } from '../atoms/icons'

const CardButton = styled.a``

const IconBox = styled.span`
  width: 1.5rem !important;
  height: 1.5rem !important;
`

export default () => (
  <div className="columns">
    <div className="column is-half is-offset-one-quarter">
      <div className="card">
        <header className="card-header-title">
          <p className="card-header-title">ユーザー登録</p>
        </header>

        <div className="card-content">
          <div className="content">
            <div className="field">
              <label htmlFor="name" className="label">
                名前
              </label>
              <div className="control has-icons-left">
                <input id="name" type="text" className="input" />
                <IconBox className="icon is-small is-left">
                  <User />
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
                  <Email />
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
                  <Key />
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
                  <Key />
                </IconBox>
              </p>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <CardButton className="card-footer-item">登録</CardButton>
        </div>
      </div>
    </div>
  </div>
)
