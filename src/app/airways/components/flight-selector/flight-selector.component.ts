import { Component, EventEmitter, Input, Output } from '@angular/core'

import { ISlot } from '../../../flights/store/flights.reducer'

@Component({
  selector: 'app-flight-selector',
  templateUrl: './flight-selector.component.html',
  styleUrls: ['./flight-selector.component.scss'],
})
export class FlightSelectorComponent {
  @Input() currentSlot: ISlot | null = null

  @Input() slots: ISlot[] = []

  @Output() clickSlot = new EventEmitter<ISlot>()

  getSeatsStyles() {
    if (!this.currentSlot || !this.currentSlot.flight?.seats.avaible) return ''

    if (this.currentSlot.flight?.seats.avaible < 10) {
      return 'background: rgba(244, 67, 54, 0.2);'
    }

    if (
      this.currentSlot.flight?.seats.avaible >
      this.currentSlot.flight?.seats.total / 2
    ) {
      return 'background: rgba(255, 152, 0, 0.2);'
    }

    return 'background: rgba(76, 175, 80, 0.2);'
  }

  getCurrentSlotStyles(slot: ISlot) {
    if (this.currentSlot?.formatDate !== slot.formatDate) return ''

    if (!this.currentSlot || !this.currentSlot.flight?.seats.avaible) return ''

    if (this.currentSlot.flight?.seats.avaible < 10) {
      return 'border-color: rgba(244, 67, 54, 0.6);'
    }

    if (
      this.currentSlot.flight?.seats.avaible >
      this.currentSlot.flight?.seats.total / 2
    ) {
      return 'border-color: rgba(255, 152, 0, 0.6);'
    }

    return 'border-color: rgba(76, 175, 80, 0.6);'
  }

  handleClickSlot(slot: ISlot) {
    if (slot.formatDate === this.currentSlot?.formatDate || slot.disabled) {
      return
    }

    this.clickSlot.emit(slot)
  }

  handleClickSelect() {}
}
