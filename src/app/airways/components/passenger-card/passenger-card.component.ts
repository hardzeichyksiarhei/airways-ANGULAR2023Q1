import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FormEvent } from '../passenger-info-form/passenger-info-form.component'

@Component({
  selector: 'app-passenger-card',
  templateUrl: './passenger-card.component.html',
  styleUrls: ['./passenger-card.component.scss'],
})
export class PassengerCardComponent {
  @Input() index: string | number = ''

  @Input() passengerType = ''

  @Output() cardChange = new EventEmitter<CardValue>()

  specialAssistance = new FormControl(false)

  cardValue: CardValue = {
    valid: false,
    passengerType: '',
    index: this.index,
    value: {
      dateOfBirth: '',
      firstName: '',
      gender: 'Male',
      lastName: '',
      specialAssistance: false,
    },
  }

  onFormChange(e: FormEvent) {
    const data: CardValue = {
      ...this.cardValue,
      index: this.index,
      passengerType: this.passengerType,
      valid: e.formValid,
      value: {
        ...this.cardValue.value,
        ...e.formValue,
        specialAssistance: !!this.specialAssistance.value,
      },
    }
    this.cardValue = data
    this.cardChange.emit(data)
  }

  onSpecialAssistanceChange() {
    const data: CardValue = {
      ...this.cardValue,
      index: this.index,
      passengerType: this.passengerType,
      value: {
        ...this.cardValue.value,
        specialAssistance: !!this.specialAssistance.value,
      },
    }

    this.cardValue = data
    this.cardChange.emit(data)
  }
}

export interface CardValue {
  valid: boolean
  passengerType: string
  index: string | number
  value: {
    dateOfBirth: string | null
    firstName: string | null
    gender: string | null
    lastName: string | null
    specialAssistance: boolean
  }
}
