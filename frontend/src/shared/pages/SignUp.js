// @flow

import { type Saga } from 'redux-saga'
import { buildActionCreator, createReducer, type ActionCreator } from 'hard-reducer'
import { compose, lifecycle, pure, setDisplayName, type HOC } from 'recompose'
import { connect } from 'react-redux'
import { getOr } from 'lodash/fp'
import { replace, push } from 'react-router-redux'
import { take, put, call, select } from 'redux-saga/effects'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import * as React from 'react'

import type { User, CombBinedState } from '../ducks/common'
import { signUp } from '../fetchr'
import Card from '../organisms/Card'
import CardFooter from '../molecules/CardFooter'
import CardHeader from '../molecules/CardHeader'
import SignUpCardContent from '../molecules/SignUpCardContent'

const { createAction } = buildActionCreator({ prefix: 'user/signup ' })

export type State = {
  email: string,
  name: string,
  password: string,
  passwordConfirmation: string,
}

export const trySignUp: ActionCreator<State> = createAction('try signup')
export const successSignIn: ActionCreator<User> = createAction('success signin')
export const failSignIn: ActionCreator<typeof Error> = createAction('fail signup')
export const changeFormData: ActionCreator<State> = createAction('change form data')

export const initialState: State = {
  email: '',
  name: '',
  password: '',
  passwordConfirmation: '',
}

export const reducer = createReducer(initialState) // reducer
  .case(changeFormData, (state, payload) => payload)

export function* saga(): Saga<void> {
  while (true) {
    yield take(trySignUp.type)
    const { draftUser } = yield select()
    yield put(showLoading())
    try {
      const user: User = yield call(signUp, {}, draftUser)
      localStorage.setItem('jwt', user.jwt)
      yield put(successSignIn(user))
      yield put(push('/dashboard'))
    } catch (err) {
      yield put(failSignIn(err))
    }
    yield put(hideLoading())
  }
}

type Actions = {
  trySignUp: typeof trySignUp,
  changeFormData: typeof changeFormData,
  push: (path: string) => void,
}

type Props = State & Actions

const mapStateToProps = (state: CombBinedState): State => ({
  jwt: getOr(null, 'user.jwt', state),
  email: state.draftUser.email,
  name: state.draftUser.name,
  password: state.draftUser.password,
  passwordConfirmation: state.draftUser.passwordConfirmation,
})

const SignUpEnhancer: HOC<Props, State> = compose(
  pure,
  connect(
    mapStateToProps,
    { trySignUp, changeFormData, replace },
  ),
  lifecycle({
    componentDidMount() {
      if (this.props.jwt !== null) {
        this.props.replace('/dashboard')
      }
    },

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
