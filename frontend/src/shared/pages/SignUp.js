// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { type Saga } from 'redux-saga'
import { take, put, call, select } from 'redux-saga/effects'
import { compose, pure, lifecycle, setDisplayName } from 'recompose'
import { buildActionCreator, createReducer, type ActionCreator } from 'hard-reducer'
import { signUp } from '../fetchr'
import type { User, CombBinedState } from '../reducer'
import Card from '../organisms/Card'
import CardHeader from '../molecules/CardHeader'
import SignUpCardContent from '../molecules/SignUpCardContent'
import CardFooter from '../molecules/CardFooter'

const { createAction } = buildActionCreator({ prefix: 'user/signup ' })

export type State = {
  email: string,
  name: string,
  password: string,
  passwordConfirmation: string,
}

export const trySignUp: ActionCreator<State> = createAction('try signup')
export const successSignUp: ActionCreator<User> = createAction('success signup')
export const failSignUp: ActionCreator<typeof Error> = createAction('fail signup')
export const changeFormData: ActionCreator<State> = createAction('change form data')

export const initalState: State = {
  email: '',
  name: '',
  password: '',
  passwordConfirmation: '',
}

export const reducer = createReducer(initalState) // reducer
  .case(changeFormData, (state, payload) => payload)

export function* saga(): Saga<void> {
  while (true) {
    yield take(trySignUp.type)
    const { draftUser } = yield select()
    try {
      const user: User = yield call(signUp, {}, draftUser)
      yield put(successSignUp(user))
    } catch (err) {
      yield put(failSignUp(err))
    }
  }
}

type Actions = {
  trySignUp: typeof trySignUp,
  changeFormData: typeof changeFormData,
}

type Props = State & Actions

const mapStateToProps = (state: CombBinedState): State => ({
  email: state.draftUser.email,
  name: state.draftUser.name,
  password: state.draftUser.password,
  passwordConfirmation: state.draftUser.passwordConfirmation,
})

export default compose(
  pure,
  connect(mapStateToProps, {
    trySignUp,
    changeFormData,
  }),
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
  setDisplayName('SignUp'),
)(({ trySignUp, changeFormData, ...props }: Props) => (
  <Card
    Header={<CardHeader title="ユーザー登録" />}
    Content={<SignUpCardContent changeFormData={changeFormData} {...props} />}
    Footer={<CardFooter buttonName="登録" onSubmit={() => trySignUp({ ...props })} />}
  />
))
