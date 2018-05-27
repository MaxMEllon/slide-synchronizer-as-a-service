// @flow

import * as React from 'react'

export default (Component: React.ComponentType<any>) => (): React.Node => (
  <section className="section">
    <div className="container">
      <Component />
    </div>
  </section>
)
