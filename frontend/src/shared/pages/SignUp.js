// @flow

import * as React from 'react'
import Card from '../organisms/Card'
import CardHeader from '../molecules/CardHeader'
import SignUpCardContent from '../molecules/SignUpCardContent'
import CardFooter from '../molecules/CardFooter'

export default () => (
  <Card
    Header={<CardHeader title="ユーザー登録" />}
    Content={<SignUpCardContent />}
    Footer={<CardFooter buttonName="登録" />}
  />
)
