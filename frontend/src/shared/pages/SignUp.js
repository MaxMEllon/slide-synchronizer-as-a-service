// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { take, put, call, select } from 'redux-saga/effects'
import { compose, pure, lifecycle } from 'recompose'
import { buildActionCreator, createReducer, type ActionCreator } from 'hard-reducer'
import { signUp } from '../fetchr'
import Card from '../organisms/Card'
import CardHeader from '../molecules/CardHeader'
import SignUpCardContent from '../molecules/SignUpCardContent'
import CardFooter from '../molecules/CardFooter'

const { createAction } = buildActionCreator({ prefix: 'user/signup ' })

export const trySignUp: ActionCreator<any> = createAction('try signup')
export const successSignUp: ActionCreator<any> = createAction('success signup')
export const failSignUp: ActionCreator<any> = createAction('fail signup')
export const changeFormData: ActionCreator<State> = createAction('change form data')

export type State = {
  email: string,
  name: string,
  password: string,
  passwordConfirmation: string,
}

export const initalState: State = {
  email: '',
  name: '',
  password: '',
  passwordConfirmation: '',
}

export const reducer = createReducer(initalState) // reducer
  .case(changeFormData, (state, payload) => payload)
  .else((state) => state)

export function* saga(): Generator<*, void, *> {
  while (true) {
    yield take(trySignUp.type)
    const { draftUser } = yield select()
    try {
      const jwt = yield call(signUp, draftUser)
      yield put(successSignUp(jwt))
    } catch (err) {
      yield put(failSignUp(err))
    }
  }
}

type Props = State & {
  trySignUp: () => void,
  changeFormData: (s: State) => void,
}

const mapStateToProps = (state): State => ({
  email: state.draftUser.email,
  name: state.draftUser.name,
  password: state.draftUser.password,
  passwordConfirmation: state.draftUser.passwordConfirmation,
})

export default compose(
  pure,
  lifecycle({
    componentWillUnmount() {
      this.props.changeFormData({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      })
    },
  }),
  connect(mapStateToProps, {
    trySignUp,
    changeFormData,
  }),
)(({ trySignUp, ...props }: Props) => (
  <Card
    Header={<CardHeader title="ユーザー登録" />}
    Content={<SignUpCardContent {...props} />}
    Footer={<CardFooter buttonName="登録" onSubmit={trySignUp} />}
  />
))
