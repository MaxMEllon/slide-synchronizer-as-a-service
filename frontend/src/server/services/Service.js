// @flow
/* eslint no-underscore-dangle: 0 */

import * as axios from 'axios'

export default class Servise {
  name: string
  axios: axios.AxiosInstance

  constructor(name: string) {
    this.name = name
    this.axios = axios.create({
      baseURL: `${process.env.API_LOC}/api`,
      timeout: 5000,
    })
  }
}
