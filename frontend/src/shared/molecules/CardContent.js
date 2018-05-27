// @flow

import * as React from 'react'

type Props = {
  +children: React.Element<any>,
}

export default ({ children }: Props) => <div className="card-content">{children}</div>
