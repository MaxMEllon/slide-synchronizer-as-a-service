// @flow

import * as React from 'react'
import styled from 'styled-components'
import keyMirror from 'keymirror'
import { type Saga, delay } from 'redux-saga'
import { compose, pure, setDisplayName, type HOC } from 'recompose'
import { connect } from 'react-redux'
import { createReducer, buildActionCreator, type ActionCreator } from 'hard-reducer'
import { put, takeEvery } from 'redux-saga/effects'

const Snackbar = styled.div`
  position: fixed !important;
  width: 80vw;
  left: 10vw;
  top: 2vh;
  z-index: 50000;
`

export type Notification = {
  message: string | null,
}

export const state: Notification = {
  message: null,
}

const { createAction } = buildActionCreator({ prefix: 'common ' })

const snackBarTypes = keyMirror({
  info: null,
  danger: null,
  warning: null,
})

export const notify: ActionCreator<Notification & $Keys<typeof snackBarTypes>> = createAction(
  'notification',
)
export const openSnackbar: ActionCreator<Notification> = createAction('open snackbar')
export const closeSnackbar: ActionCreator<void> = createAction('close snackbar')

export const reducer = createReducer(state) // reducer
  .case(openSnackbar, (state, payload: Notification) => Object.assign({}, state, payload))
  .case(closeSnackbar, (state) => Object.assign({}, state, { message: null }))

type Props = {
  message: string | null,
  type: string,
}

type Actions = {
  closeSnackbar: typeof closeSnackbar,
}

const mapStateToProps = (state) => ({
  message: state.notification.message,
  type: state.notification.type,
})

const NotificationEnhancer: HOC<Props & Actions, *> = compose(
  pure,
  connect(
    mapStateToProps,
    { closeSnackbar },
  ),
  setDisplayName('Notification'),
)

export function* saga(): Saga<void> {
  yield takeEvery(notify.type, function* notifyTask(action: {
    payload: Notification,
    type: string,
  }): any {
    const { payload } = action
    yield put(openSnackbar(payload))
    yield delay(2000)
    yield put(closeSnackbar())
  })
}

export default NotificationEnhancer(function Notification({
  message,
  closeSnackbar,
  type = 'info',
}: Props & Actions) {
  if (message === null) return null
  const className = `notification is-${type}`
  return (
    <Snackbar className={className}>
      <button className="delete" onClick={() => closeSnackbar()} />
      {message}
    </Snackbar>
  )
})
