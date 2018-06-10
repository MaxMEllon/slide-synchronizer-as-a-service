import { delay } from 'redux-saga'
import { fork, put, takeEvery } from 'redux-saga/effects'

import { saga as signUpTask, successSignIn, failSignIn } from '../pages/SignUp'
import { notify, openSnackbar, closeSnackbar, type Notification } from '../organisms/Notification'

function* notificationTask(action: { type: string, payload: Notification }) {
  const { payload } = action
  yield put(openSnackbar(payload))
  yield delay(3000)
  yield put(closeSnackbar())
}

function* restoreJWTTask() {
  const jwt: string | null = window.localStorage.getItem('jwt')
  if (jwt) yield put(successSignIn({ jwt }))
  else yield put(failSignIn(new Error('Unauthalized')))
}

const isServer = () => {
  try {
    // eslint lodash-fp/prefer-get: [0]
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
  yield takeEvery(notify.type, notificationTask)
  yield fork(signUpTask)
}
