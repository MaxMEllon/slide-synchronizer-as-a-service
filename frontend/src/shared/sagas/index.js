import { type Saga, delay } from 'redux-saga'
import { fork, put, takeEvery } from 'redux-saga/effects'

import { saga as signUpTask, successSignIn, failSignIn } from '../pages/SignUp'
import { notification, openSnackbar, closeSnackbar, type Notification } from '../ducks/common'

function* notificationTask(action: { type: string, payload: Notification }) {
  const { payload } = action
  yield put(openSnackbar({ notification: payload.notification }))
  yield delay(3000)
  yield put(closeSnackbar())
}

function* restoreJWTTask() {
  const jwt: string | null = window.localStorage.getItem('jwt')
  if (jwt) yield put(successSignIn({ jwt }))
  else yield put(failSignIn(new Error('Unauthalized')))
}

export default function* rootSaga() {
  if (!global) {
    yield fork(restoreJWTTask)
  }
  yield takeEvery(notification.type, notificationTask)
  yield fork(signUpTask)
}
