// @flow

import { combineReducers } from 'redux'
import { createReducer } from 'hard-reducer'
import { reducer as draftUser, successSignUp, type State as DraftUser } from './pages/SignUp'

type State = {
  user: null | string,
}

const state = {
  user: null,
}

export type CombBinedState = DraftUser & State

const user = createReducer((state: State)).case(successSignUp, (state, payload) =>
  Object.assign({}, state, { user: payload }),
)

export default combineReducers({
  draftUser,
  user,
})
