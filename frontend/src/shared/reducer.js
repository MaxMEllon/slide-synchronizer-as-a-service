// @flow

import { combineReducers } from 'redux'
import { createReducer } from 'hard-reducer'
import { routerReducer } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import {
  reducer as draftUser,
  successSignUp,
  initialState as initialDraftUser,
  type State as DraftUser,
} from './pages/SignUp'

export type User = {
  user: {
    jwt: string | null,
  },
}

const state: User = {
  user: {
    jwt: null,
  },
}

export type CombBinedState = {
  draftUser: DraftUser,
  user: User,
}

export const initialState = {
  ...state,
  draftUser: initialDraftUser,
}

const user = createReducer(state.user) // reducer
  .case(successSignUp, (state, payload: User) => Object.assign({}, state, payload))

export default combineReducers({
  draftUser,
  user,
  router: routerReducer,
  loadingBar: loadingBarReducer,
})
