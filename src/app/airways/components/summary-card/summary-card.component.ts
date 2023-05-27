import { Component, Input } from '@angular/core'

import { ISlot } from '../../../flights/store/flights.reducer'
import dayjs from 'dayjs'
import { PassengerCard } from '../../store/passengers/passengers.reducer'

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent {
  @Input() currentSlot: ISlot | null = null

  @Input() direction!: 'FROM' | 'TO'

  @Input() passengers: PassengerCard[] = []

  get dateFormat() {
    if (!this.currentSlot || !this.currentSlot.date) return ''

    return dayjs(this.currentSlot.date).format('dddd, DD MMMM, YYYY')
  }

  get timeFormat() {
    if (!this.currentSlot || !this.currentSlot.date) return ''

    const timeMins = this.currentSlot.flight?.timeMins || 0

    const date = dayjs(this.currentSlot.date)
    const startTime = date.format('HH:mm')
    const endTime = date.add(timeMins, 'minute').format('HH:mm')

    return `${startTime} - ${endTime}`
  }
}
