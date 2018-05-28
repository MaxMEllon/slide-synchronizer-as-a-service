import { fork } from 'redux-saga/effects'
import { saga as signUpTask } from '../pages/SignUp'

export default function* rootSaga() {
  yield fork(signUpTask)
}
