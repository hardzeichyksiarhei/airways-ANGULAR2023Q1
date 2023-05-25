import { Component, Input } from '@angular/core'
import * as dayjs from 'dayjs'

import { IFlight } from '../../../flights/store/flights.model'

interface ISlot {
  date: dayjs.Dayjs
  formatDate: string
  dayOfWeek: string
  disabled: boolean
}

@Component({
  selector: 'app-flight-selector',
  templateUrl: './flight-selector.component.html',
  styleUrls: ['./flight-selector.component.scss'],
})
export class FlightSelectorComponent {
  @Input() flight: IFlight | null = null

  get currentSlot(): ISlot | null {
    if (!this.flight) return null

    const date = dayjs(this.flight.takeoffDate)

    return {
      date,
      formatDate: date.format('DD ddd'),
      dayOfWeek: date.format('dddd'),
      disabled: false,
    }
  }

  get slots() {
    if (!this.currentSlot || !this.flight) return []

    const keys = Object.keys(this.flight?.otherFlights || {})

    const beforeSlots = [...new Array(5)].map((_, i) => {
      const date = this.currentSlot?.date.subtract(i + 1, 'day')

      return {
        date,
        formatDate: date?.format('DD ddd'),
        dayOfWeek: date?.format('dddd'),
        disabled: !keys.includes(`${i - 5}`),
      }
    })

    const afterSlots = [...new Array(5)].map((_, i) => {
      const date = this.currentSlot?.date.add(i + 1, 'day')

      return {
        date,
        formatDate: date?.format('DD ddd'),
        dayOfWeek: date?.format('dddd'),
        disabled: !keys.includes(`${i + 1}`),
      }
    })

    return [...beforeSlots.reverse(), this.currentSlot, ...afterSlots]
  }
}
