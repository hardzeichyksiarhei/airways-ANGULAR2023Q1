import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-change-passengers-count-item',
  templateUrl: './change-passengers-count-item.component.html',
  styleUrls: ['./change-passengers-count-item.component.scss'],
})
export class ChangePassengersCountItemComponent implements OnInit {
  @Input() passengerType = 'adults'

  @Input() passengerCount: number | string = 0

  @Output() changePassengersCount = new EventEmitter<{
    key: /*'adults' | 'child' | 'infant' |*/ string
    value: number
  }>()

  shouldShow = false

  ngOnInit(): void {
    this.shouldShow =
      this.passengerType === 'adults' ||
      this.passengerType === 'child' ||
      this.passengerType === 'infant'
  }

  onValueDecrement(event: MouseEvent) {
    event.stopPropagation()

    if (this.passengerCount <= 0) return
    this.changePassengersCount.emit({
      key: this.passengerType,
      value: +this.passengerCount - 1,
    })
  }

  onValueIncrement(event: MouseEvent) {
    event.stopPropagation()

    this.changePassengersCount.emit({
      key: this.passengerType,
      value: +this.passengerCount + 1,
    })
  }
}
