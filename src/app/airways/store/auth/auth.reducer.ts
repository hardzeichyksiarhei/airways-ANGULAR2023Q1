import { createReducer, on } from '@ngrx/store'
import {
  loginSuccess,
  signupSuccess,
  logout,
  clearAuthError,
  setAuthError,
} from './auth.actions'

export interface AuthState {
  token: string | null
  error: string | null
}

const initialState: AuthState = {
  token: null,
  error: null,
}

export const authReducer = createReducer(
  initialState,
  on(
    loginSuccess,
    (state, action): AuthState => ({
      ...state,
      error: null,
      token: action.token,
    })
  ),
  on(
    signupSuccess,
    (state, action): AuthState => ({
      token: action.token,
      error: null,
    })
  ),
  on(
    logout,
    (): AuthState => ({
      token: null,
      error: null,
    })
  ),
  on(
    clearAuthError,
    (state): AuthState => ({
      ...state,
      error: null,
    })
  ),
  on(
    setAuthError,
    (state, action): AuthState => ({
      ...state,
      error: action.error,
    })
  )
)
