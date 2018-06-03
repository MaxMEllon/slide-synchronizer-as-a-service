// @flow

import * as React from 'react'
import { compose, setDisplayName, type HOC } from 'recompose'

const DashboardEnhancer: HOC<*, *> = compose(setDisplayName('Dashboard'))

export default DashboardEnhancer(() => <div />)
