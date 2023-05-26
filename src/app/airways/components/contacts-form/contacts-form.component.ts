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
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss'],
})
export class ContactsFormComponent {
  @Output() changeForm = new EventEmitter<ContactsForValue>()

  contactsForm = new FormGroup({
    countryCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[\\+]([0-9]{1,3})'),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(new RegExp('[0-9]{7}')),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  matcher = new MyErrorStateMatcher()

  onContactsFormChange() {
    const data = this.contactsForm.value as ContactsForValue
    this.changeForm.emit(data)
  }
}

interface ContactsForValue {
  countryCode: string | null
  phone: string | null
  email: string | null
}
