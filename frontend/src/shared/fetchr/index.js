// @flow

import Fetchr from 'fetchr'
import pino from 'pino'

import type { User } from '../ducks/common'
import { type State as DraftUser } from '../pages/SignUp'

const log = pino()

const fetchr = new Fetchr({
  xhrPath: '/ssaas/api',
})

export const createFetchrAsPromise = <P, B, R>(
  service: string,
  method: string,
  params: P,
  body: B,
  config: any,
): Promise<R> =>
    new Promise((resolve, reject) => {
      fetchr[method](service)
        .params(params)
        .body(body)
        .clientConfig(config)
        .end((err, res) => {
          if (err) {
            log.error('fetchr error %o', err)
            return reject(err)
          }
          log.info('fetchr success %o', res)
          resolve(res)
        })
    })

export const signUp: Promise<User> = (params: {}, body: DraftUser, config = {}) =>
  createFetchrAsPromise('user', 'create', params, body, config)
export const signIn: Promise<User> = (params: {}, body: any, config = {}) =>
  createFetchrAsPromise('user', 'update', params, body, config)
