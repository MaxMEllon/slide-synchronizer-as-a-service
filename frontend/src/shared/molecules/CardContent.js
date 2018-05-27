// @flow

import * as React from 'react'

type Props = {
  +Content: React.Element<any>,
}

export default ({ Content }: Props) => <div className="card-content">{Content}</div>
