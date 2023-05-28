import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'
import { Store } from '@ngrx/store'
import { Observable, take } from 'rxjs'
import { selectContacts } from '../../store/passengers/passengers.selectors'
import { changeContacts } from '../../store/passengers/passengers.actions'

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
export class ContactsFormComponent implements OnInit {
  @Output() changeForm = new EventEmitter<ContactsForValue>()

  constructor(private store: Store) {}

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

  contacts$: Observable<Contacts> = this.store.select(selectContacts)

  ngOnInit(): void {
    this.contacts$.pipe(take(1)).subscribe((contacts) => {
      this.contactsForm.controls.email.setValue(contacts.email)
      this.contactsForm.controls.countryCode.setValue(contacts.countryCode)
      this.contactsForm.controls.phone.setValue(contacts.phone)
    })
  }

  onContactsFormChange() {
    const contacts = this.contactsForm.value as ContactsForValue
    const valid = this.contactsForm.valid
    const data = { ...contacts, valid }
    this.changeForm.emit(data)
  }
}

export interface Contacts {
  countryCode: string | null
  phone: string | null
  email: string | null
}
export interface ContactsForValue extends Contacts {
  valid: boolean
}
