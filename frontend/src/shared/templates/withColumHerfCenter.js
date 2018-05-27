// @flow

import * as React from 'react'

export default (Component: React.ComponentType<any>) => (): React.Node => (
  <section className="section">
    <div className="container">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <Component />
        </div>
      </div>
    </div>
  </section>
)
