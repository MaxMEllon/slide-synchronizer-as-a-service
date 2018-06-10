// @flow

import React from 'react'
import styled from 'styled-components'
import { compose, pure, setDisplayName, type HOC } from 'recompose'
import { connect } from 'react-redux'

import { closeSnackbar, type CombBinedState } from '../ducks/common'

const Snackbar = styled.div`
  position: fixed;
  width: 80vw;
  left: 10vw;
  top: 5vh;
  z-index: 5000;
`

const mapStateToProps = (state: CombBinedState) => ({
  message: state.notification.message,
})

type Props = {
  message: string | null,
}

type Actions = {
  closeSnackbar: typeof closeSnackbar,
}

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
    <Snackbar className="notification is-infoj">
      <button className="delete" onClick={closeSnackbar} />
      {message}
    </Snackbar>
  )
})
