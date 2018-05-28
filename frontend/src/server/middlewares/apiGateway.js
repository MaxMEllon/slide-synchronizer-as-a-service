import Fetchr from 'fetchr'
import { info } from '../../shared/helpers/debugger'
import * as services from '../services'

export default function apiGateway() {
  Object.values(services).forEach((Service: any) => {
    const service = promiseResolver(new Service())
    info(`===> Registered service: ${service.name}`)
    Fetchr.registerService(service)
  })

  return Fetchr.middleware()
}

function promiseResolver(service) {
  const resolvedService = { name: service.name }
  const methods = [['read', 'delete'], ['update', 'create']]
  methods[0].forEach((method) => {
    resolvedService[method] = (req, resource, params, config, done) => {
      service[method](req, resource, params, config).then(
        (res) => done(null, res.data, res.meta),
        (err) => done(err),
      )
    }
  })

  methods[1].forEach((method) => {
    resolvedService[method] = (req, resource, params, body, config, done) => {
      service[method](req, resource, params, body, config).then(
        (res) => done(null, res.data, res.meta),
        (err) => done(err),
      )
    }
  })

  return resolvedService
}
