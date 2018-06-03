// @flow

import * as React from 'react'
import { buildActionCreator, createReducer, type ActionCreator } from 'hard-reducer'
import { compose, lifecycle, pure, setDisplayName, type HOC } from 'recompose'
import { connect } from 'react-redux'
import { take, put, call, select } from 'redux-saga/effects'
import { type Saga } from 'redux-saga'

import Card from '../organisms/Card'
import CardFooter from '../molecules/CardFooter'
import CardHeader from '../molecules/CardHeader'
import SignUpCardContent from '../molecules/SignUpCardContent'
import type { User, CombBinedState } from '../reducer'
import { signUp } from '../fetchr'

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

const SignUpEnhancer: HOC<Props, State> = compose(
  pure,
  connect(
    mapStateToProps,
    { trySignUp, changeFormData },
  ),
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
)

export default SignUpEnhancer(({ trySignUp, changeFormData, ...props }: Props) => (
  <Card
    Header={<CardHeader title="ユーザー登録" />}
    Content={<SignUpCardContent changeFormData={changeFormData} {...props} />}
    Footer={<CardFooter buttonName="登録" onSubmit={() => trySignUp({ ...props })} />}
  />
))
