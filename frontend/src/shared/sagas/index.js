// @saga

import { fork } from 'redux-saga/effects'
import type { Saga } from 'redux-saga'
import { saga as signUpTask } from '../pages/SignUp'

export default function* rootSaga(): Saga<void> {
  yield fork(signUpTask)
}
