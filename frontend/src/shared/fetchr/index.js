import Fetchr from 'fetchr'
import { type State as DraftUser } from '../pages/SignUp'
import type { User } from '../reducer'

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
        .end((err, data) => {
          if (err) reject(err)
          resolve(data)
        })
    })

export const signUp: Promise<User> = (params: {}, body: DraftUser, config = {}) =>
  createFetchrAsPromise('user', 'create', params, body, config)
export const signIn: Promise<User> = (params: {}, body: any, config = {}) =>
  createFetchrAsPromise('user', 'update', params, body, config)
