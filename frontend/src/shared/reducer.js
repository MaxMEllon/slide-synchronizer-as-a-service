// @flow

import { combineReducers } from 'redux'
import { createReducer } from 'hard-reducer'
import { reducer as draftUser, successSignUp, type State as DraftUser } from './pages/SignUp'

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

export type CombBinedState = DraftUser & User

const user = createReducer(state.user) // reducer
  .case(successSignUp, (state, payload: User) => Object.assign({}, state, payload))

export default combineReducers({
  draftUser,
  user,
})
