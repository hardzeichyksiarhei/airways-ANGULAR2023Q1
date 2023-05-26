import { Component } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'
import { AuthService } from '../../store/auth/auth.service'
import { Store } from '@ngrx/store'
import { tryLogin } from '../../store/auth/auth.actions'
import { Observable } from 'rxjs'
import { selectAuthError } from '../../store/auth/auth.selectors'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    )
  }
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  constructor(private authService: AuthService, private store: Store) {}

  authError$: Observable<string | null> = this.store.select(selectAuthError)

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  })

  matcher = new MyErrorStateMatcher()

  onSubmit() {
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    if (!email || !password) return

    this.store.dispatch(tryLogin({ email, password }))
  }
}
