// @saga

import { fork, put } from 'redux-saga/effects'
import type { Saga } from 'redux-saga'
import { saga as signUpTask, successSignIn, failSignIn } from '../pages/SignUp'

function* restoreJWTTask(): Saga<void> {
  const jwt = window.localStorage.getItem('jwt')
  if (jwt) yield put(successSignIn({ jwt }))
  else yield put(failSignIn())
}

export default function* rootSaga(): Saga<void> {
  if (window && window.localStorage) {
    yield fork(restoreJWTTask)
  }
  yield fork(signUpTask)
}
