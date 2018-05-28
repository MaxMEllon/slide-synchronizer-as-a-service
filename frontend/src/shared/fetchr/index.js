import Fetchr from 'fetchr'
import { type State as DraftUser } from '../pages/SignUp'

const fetchr = new Fetchr({
  xhrPath: '/ssaas/api',
})

export const signUp = (payload: DraftUser) =>
  new Promise((resolve, reject) => {
    fetchr
      .create('user')
      .params({})
      .body(payload)
      .end((err, data) => {
        if (err) reject(err)
        resolve(data)
      })
  })
