import { Component } from '@angular/core'
import { ErrorStateMatcher } from '@angular/material/core'
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms'
import { AuthService } from '../../services/auth.service'

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
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  constructor(private authService: AuthService) {}

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(new RegExp('^[a-zA-Z]+$')),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(new RegExp('^[a-zA-Z]+$')),
    ]),
    dateOfBirth: new FormControl('', [Validators.required]),
    countryCode: new FormControl('', [
      Validators.required,
      Validators.pattern('\\+([0-9]{1-3})\\)'),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(new RegExp('[0-9]{7}')),
    ]),
    citizenship: new FormControl(),
    gender: new FormControl('Female'),
    privacy: new FormControl(true),
  })

  matcher = new MyErrorStateMatcher()

  onSubmit() {
    console.log(this.signUpForm.value)

    const aa = this.signUpForm.value
    const data = { ...aa, countryCode: '+375' }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.authService.signup(data).subscribe(console.log)
  }
}
