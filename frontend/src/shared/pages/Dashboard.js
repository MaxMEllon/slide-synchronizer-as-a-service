// @flow

import * as React from 'react'
import { compose, setDisplayName, type HOC } from 'recompose'
import { connect } from 'react-redux'

import decode from '../helpers/decode'

const mapStateToProps = (state) => ({
  user: decode(state.user.jwt),
})

const DashboardEnhancer: HOC<*, *> = compose(
  connect(mapStateToProps),
  setDisplayName('Dashboard'),
)

export default DashboardEnhancer(() => <div />)
