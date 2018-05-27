// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { pure } from 'recompose'
import { buildActionCreator, createReducer, type ActionCreator } from 'hard-reducer'
import Card from '../organisms/Card'
import CardHeader from '../molecules/CardHeader'
import SignUpCardContent from '../molecules/SignUpCardContent'
import CardFooter from '../molecules/CardFooter'

const { createAction } = buildActionCreator({ prefix: 'user/signup' })

export type State = {
  email: string,
  name: string,
  password: string,
  passwordConfirmation: string,
}

export const trySignUp: ActionCreator<any> = createAction('try signup')
export const successSignUp: ActionCreator<any> = createAction('success signup')
export const failSignUp: ActionCreator<any> = createAction('fail signup')
export const changeFormData: ActionCreator<State> = createAction('change form data')

export const initalState = {
  email: '',
  name: '',
  password: '',
  passwordConfirmation: '',
}

export const reducer = createReducer(initalState) // reducer
  .case(changeFormData, (state, payload) => payload)
  .else((state) => state)

type Props = State & {
  trySignUp: (void) => void,
  changeFormData: (s: State) => void,
}

const App = pure(({ trySignUp, ...props }: Props) => (
  <Card
    Header={<CardHeader title="ユーザー登録" />}
    Content={<SignUpCardContent {...props} />}
    Footer={<CardFooter buttonName="登録" onSubmit={trySignUp} />}
  />
))

export default connect(
  (state) => ({
    email: state.draftUser.email,
    name: state.draftUser.name,
    password: state.draftUser.password,
    passwordConfirmation: state.draftUser.passwordConfirmation,
  }),
  {
    trySignUp,
    changeFormData,
  },
)(App)
