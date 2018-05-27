// @flow

import * as React from 'react'
import CardContent from './CardContent'
import FormField from '../atoms/FromField'
import { type State } from '../pages/SignUp'

type Props = State & {
  changeFormData: (s: State) => void,
}

const onChangeCreator = (props: State, changeFormData: (s: State) => void) => (
  e: any,
  type: string,
) => {
  const input: string = e.target.value
  const next = Object.assign(props, { [type]: input })
  changeFormData({ ...next })
}

export default ({ changeFormData, ...props }: Props) => {
  const onChange = onChangeCreator(props, changeFormData)
  return (
    <CardContent>
      <div className="content">
        <FormField
          name="name"
          icon="user"
          type="text"
          label="名前"
          value={props.name}
          onChange={(e) => onChange(e, 'name')}
        />
        <FormField
          name="email"
          icon="email"
          type="email"
          label="E-mail"
          value={props.email}
          onChange={(e) => onChange(e, 'email')}
        />
        <FormField
          name="password"
          icon="key"
          type="password"
          label="パスワード"
          value={props.password}
          onChange={(e) => onChange(e, 'password')}
        />
        <FormField
          name="passwordConfirmation"
          icon="key"
          type="password"
          label="パスワード(確認)"
          value={props.passwordConfirmation}
          onChange={(e) => onChange(e, 'passwordConfirmation')}
        />
      </div>
    </CardContent>
  )
}
