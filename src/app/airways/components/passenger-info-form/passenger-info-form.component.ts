import { Component, EventEmitter, Output } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'

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
  selector: 'app-passenger-info-form',
  templateUrl: './passenger-info-form.component.html',
  styleUrls: ['./passenger-info-form.component.scss'],
})
export class PassengerInfoFormComponent {
  @Output() formChange = new EventEmitter<{
    formValue: FormValue
    formValid: boolean
  }>()

  passengerInfoForm = new FormGroup({
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
    gender: new FormControl('Male', [Validators.required]),
  })

  matcher = new MyErrorStateMatcher()

  onFormChange() {
    const formValue = this.passengerInfoForm.value as FormValue

    this.formChange.emit({
      formValue,
      formValid: this.passengerInfoForm.valid,
    })
  }
}

interface FormValue {
  firstName: string | null
  lastName: string | null
  dateOfBirth: string | null
  gender: string | null
}
