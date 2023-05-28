import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'
import { Store } from '@ngrx/store'
import { selectPassengersList } from '../../store/passengers/passengers.selectors'
import { Observable, take } from 'rxjs'
import { CardValue } from '../passenger-card/passenger-card.component'
import { PassengerCard } from '../../store/passengers/passengers.reducer'

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
export class PassengerInfoFormComponent implements OnInit {
  constructor(private store: Store) {}

  @Input() index = 0

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

  passengersList$: Observable<PassengerCard[]> =
    this.store.select(selectPassengersList)

  card: CardValue = {} as CardValue

  ngOnInit(): void {
    this.passengersList$.pipe(take(1)).subscribe((list) => {
      const formValueCard = list.find((el) => el.index === this.index)
      if (!formValueCard) return

      // const formValueCard = card as unknown as FormValue
      this.passengerInfoForm.controls.firstName.setValue(
        formValueCard.firstName || ''
      )
      this.passengerInfoForm.controls.lastName.setValue(
        formValueCard.lastName || ''
      )
      this.passengerInfoForm.controls.dateOfBirth.setValue(
        formValueCard.dateOfBirth || ''
      )
    })
  }

  onFormChange() {
    const formValue = this.passengerInfoForm.value as FormValue

    this.formChange.emit({
      formValue,
      formValid: this.passengerInfoForm.valid,
    })
  }
}

export interface FormValue {
  firstName: string | null
  lastName: string | null
  dateOfBirth: string | null
  gender: string | null
}

export interface FormEvent {
  formValue: FormValue
  formValid: boolean
}
