// @flow

import * as React from 'react'
import styled from 'styled-components'
import { compose, pure, setDisplayName, type HOC } from 'recompose'
import { connect } from 'react-redux'
import { createReducer, buildActionCreator, type ActionCreator } from 'hard-reducer'

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

export const notify: ActionCreator<Notification> = createAction('notification')
export const openSnackbar: ActionCreator<Notification> = createAction('open snackbar')
export const closeSnackbar: ActionCreator<void> = createAction('close snackbar')

export const reducer = createReducer(state) // reducer
  .case(openSnackbar, (state, payload: Notification) => Object.assign({}, state, payload))
  .case(closeSnackbar, (state) => Object.assign({}, state, { message: null }))

type Props = {
  message: string | null,
}

type Actions = {
  closeSnackbar: typeof closeSnackbar,
}

const mapStateToProps = (state) => ({
  message: state.notification.message,
})

const NotificationEnhancer: HOC<Props & Actions, Props> = compose(
  pure,
  connect(
    mapStateToProps,
    { closeSnackbar },
  ),
  setDisplayName('Notification'),
)

export default NotificationEnhancer(function Notification({
  message,
  closeSnackbar,
}: Props & Actions) {
  if (message === null) return null
  return (
    <Snackbar className="notification is-info">
      <button className="delete" onClick={() => closeSnackbar()} />
      {message}
    </Snackbar>
  )
})
