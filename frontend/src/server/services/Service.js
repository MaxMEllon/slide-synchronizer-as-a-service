// @flow
/* eslint no-underscore-dangle: 0 */

import axios, { type Axios } from 'axios'
import { getOr } from 'lodash/fp'

const uri = (getOr('http://localhost:3000', 'API_LOC', process.env): string)

export default class Servise {
  name: string
  axios: Axios

  constructor(name: string) {
    this.name = name
    this.axios = axios.create({
      baseURL: `${uri}/api`,
      timeout: 5000,
    })
  }
}
