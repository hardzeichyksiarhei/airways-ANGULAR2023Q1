import { Component, Input } from '@angular/core'

import { ISlot } from '../../../flights/store/flights.reducer'

@Component({
  selector: 'app-flight-selector',
  templateUrl: './flight-selector.component.html',
  styleUrls: ['./flight-selector.component.scss'],
})
export class FlightSelectorComponent {
  @Input() currentSlot: ISlot | null = null

  @Input() slots: ISlot[] = []
}
