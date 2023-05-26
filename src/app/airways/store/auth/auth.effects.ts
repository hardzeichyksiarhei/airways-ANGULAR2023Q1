import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY, of } from 'rxjs'
import { map, exhaustMap, catchError } from 'rxjs/operators'

import {
  tryLogin,
  loginSuccess,
  trySignup,
  signupSuccess,
  setAuthError,
} from './auth.actions'
import { AuthService, SignUpDto } from './auth.service'
import { Store } from '@ngrx/store'

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tryLogin.type),
      exhaustMap((action: { email: string; password: string }) =>
        this.authService.login(action.email, action.password).pipe(
          map((auth) => loginSuccess(auth)),
          catchError(() =>
            of(setAuthError({ error: 'Error! Check email or password' }))
          )
        )
      )
    )
  })

  signUp = createEffect(() => {
    return this.actions$.pipe(
      ofType(trySignup.type),
      exhaustMap((action: SignUpDto) =>
        this.authService.signup(action).pipe(
          map((auth) => signupSuccess(auth)),
          catchError(() => EMPTY)
        )
      )
    )
  })
}
