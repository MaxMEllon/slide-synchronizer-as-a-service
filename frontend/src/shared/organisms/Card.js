// @flow

import * as React from 'react'

type Props = {
  Header: React.Element<any>,
  Content: React.Element<any>,
  Footer: React.Element<any>,
}

export default ({ Header, Content, Footer }: Props) => (
  <div className="card">
    {Header}
    {Content}
    {Footer}
  </div>
)
