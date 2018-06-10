// @flow

import { combineReducers } from 'redux'
import { createReducer, buildActionCreator, type ActionCreator } from 'hard-reducer'
import { routerReducer } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import {
  reducer as draftUser,
  successSignIn,
  failSignIn,
  initialState as initialDraftUser,
  type State as DraftUser,
} from '../pages/SignUp'

import {
  reducer as notification,
  state as initialNotification,
  type Notification,
} from '../organisms/Notification'

export type User = {
  user: {
    jwt: string | null,
  },
}

const state: User & Notification = {
  user: {
    jwt: null,
  },
  notification: {
    message: null,
  },
}

export type CombBinedState = {
  notification: Notification,
  draftUser: DraftUser,
  user: User,
}

export const initialState = {
  ...state,
  draftUser: initialDraftUser,
  notification: initialNotification,
}

const user = createReducer(state.user) // reducer
  .case(successSignIn, (state, payload: User) => Object.assign({}, state, payload))
  .case(failSignIn, (state) => Object.assign({}, state, { jwt: null }))

export const reducer = combineReducers({
  notification,
  draftUser,
  user,
  router: routerReducer,
  loadingBar: loadingBarReducer,
})
