// @flow

import snakeCaseKeys from 'snakecase-keys'
import Service from './Service'

export default class User extends Service {
  constructor() {
    super('user')
  }

  read(req: any, resource: any, params: any) {}

  create(req: any, resource: any, params: any, body: any) {
    return this.axios.post('/users/sign_up', snakeCaseKeys(body))
  }

  update(req: any, resource: any, params: any, body: any) {
    return this.axios.post('/users/sign_in', snakeCaseKeys(body))
  }

  delete(req: any, resource: any, params: any, body: any) {
    const path = `/usets/sign_out?token=${params.token}`
    return this.axios.post(path, snakeCaseKeys(body))
  }
}
