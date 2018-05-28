// @flow

import Fetchr from 'fetchr'
import { info } from '../../shared/helpers/debugger'
import * as services from '../services'

export default function apiGateway() {
  Object.values(services).forEach((Service: any) => {
    const service = new Service()
    info(`===> Registered service: ${service.name}`)
    Fetchr.registerService(service)
  })

  return Fetchr.middleware()
}
