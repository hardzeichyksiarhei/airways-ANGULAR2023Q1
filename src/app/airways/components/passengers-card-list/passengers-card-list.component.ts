import { Component, OnInit } from '@angular/core'
import { CardValue } from '../passenger-card/passenger-card.component'
import { Store } from '@ngrx/store'
import { Observable, take } from 'rxjs'
import {
  selectPassengers,
  selectTotalPassengers,
} from '../../store/search/search.selectors'
import { IPassengers } from '../../store/search/search.reducer'
import {
  addPassenger,
  changePassengersListValid,
  createPassengersList,
} from '../../store/passengers/passengers.actions'
import {
  selectPassengersList,
  selectPassengersListValid,
} from '../../store/passengers/passengers.selectors'
import { PassengerCard } from '../../store/passengers/passengers.reducer'

@Component({
  selector: 'app-passengers-card-list',
  templateUrl: './passengers-card-list.component.html',
  styleUrls: ['./passengers-card-list.component.scss'],
})
export class PassengersCardListComponent implements OnInit {
  constructor(private store: Store) {}

  totalPassengers$: Observable<number> = this.store.select(
    selectTotalPassengers
  )

  passengers$: Observable<IPassengers> = this.store.select(selectPassengers)

  passengersList$: Observable<PassengerCard[]> =
    this.store.select(selectPassengersList)

  passengersListValid$: Observable<boolean> = this.store.select(
    selectPassengersListValid
  )

  cardsList: Card[] = []

  onCardChange(e: CardValue) {
    this.store.dispatch(addPassenger(e))
  }

  ngOnInit(): void {
    this.createCardsList()
    this.checkValid()
  }

  checkValid() {
    this.passengersList$.subscribe((pass) => {
      let valid = true
      if (pass.length) {
        for (let i = 0; i < pass.length; i++) {
          if (!pass[i].valid) {
            valid = false
            break
          }
        }
        this.store.dispatch(changePassengersListValid({ valid }))
      }
    })
  }

  createCardsList() {
    this.passengers$.subscribe((passengers) => {
      const adults =
        passengers?.adults === 0
          ? []
          : new Array(passengers.adults).fill({
              passengerType: 'Adult',
            })
      const child =
        passengers?.child === 0
          ? []
          : new Array(passengers.child).fill({
              passengerType: 'Child',
            })
      const infant =
        passengers?.infant === 0
          ? []
          : new Array(passengers.infant).fill({
              passengerType: 'Infant',
            })
      const list = adults
        .concat(child)
        .concat(infant)
        .map((el, index) => {
          return { ...el, index: index + 1 }
        })

      let totalPassengers = 0
      this.totalPassengers$.pipe(take(1)).subscribe((total) => {
        totalPassengers = total
      })

      this.passengersList$.pipe(take(1)).subscribe((cardsList) => {
        if (!(cardsList.length === totalPassengers)) {
          this.store.dispatch(createPassengersList({ list }))
          this.cardsList = list
        }
        if (cardsList.length === totalPassengers) {
          let adultsCount = 0
          let childCount = 0
          let infantCount = 0
          cardsList.forEach((el) => {
            if (el.passengerType === 'Adult') {
              adultsCount = adultsCount + 1
            }
            if (el.passengerType === 'Child') {
              childCount = childCount + 1
            }
            if (el.passengerType === 'Infant') {
              infantCount = infantCount + 1
            }
          })

          if (
            passengers.adults !== adultsCount ||
            passengers.child !== childCount ||
            passengers.infant !== infantCount
          ) {
            this.store.dispatch(createPassengersList({ list }))
            this.cardsList = list
          } else {
            this.cardsList = list
          }
        }
      })
    })
  }
}

export interface Card {
  index: number | string
  passengerType: string
  passengerInfo: CardValue
}
