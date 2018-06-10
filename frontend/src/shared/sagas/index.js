import { fork, put } from 'redux-saga/effects'

import { saga as signUpTask, successSignIn, failSignIn } from '../pages/SignUp'
import { saga as notificationTask } from '../organisms/Notification'

function* restoreJWTTask() {
  const jwt: string | null = window.localStorage.getItem('jwt')
  if (jwt) yield put(successSignIn({ jwt }))
  else yield put(failSignIn(new Error('Unauthalized')))
}

const isServer = () => {
  try {
    /* eslint lodash-fp/prefer-get: [0], no-unused-expressions: [0] */
    window && window.localStorage && window.localStorage.getItem
    return false
  } catch (_) {
    return true
  }
}

export default function* rootSaga() {
  if (!isServer()) {
    yield fork(restoreJWTTask)
  }
  yield fork(notificationTask)
  yield fork(signUpTask)
}
