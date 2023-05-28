import { createAction, props } from '@ngrx/store'

import { IAuth } from './auth.model'
import { SignUpDto } from './auth.service'

export const tryLogin = createAction(
  '[Airway Auth] Login',
  props<{ email: string; password: string }>()
)

export const loginSuccess = createAction(
  '[Airway Auth] Login Success',
  props<{ token: string }>()
)

export const trySignup = createAction(
  '[Airway Auth] SignUp',
  props<SignUpDto>()
)

export const signupSuccess = createAction(
  '[Airway Auth] SignUp Success',
  props<IAuth>()
)

export const logout = createAction('[Airway Auth] Logout')

export const clearAuthError = createAction('[Airway Auth] ClearAuth Error')

export const setAuthError = createAction(
  '[Airway Auth] SetAuth Error',
  props<{ error: string }>()
)
