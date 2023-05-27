import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { ActivatedRoute, Router } from '@angular/router'
import { selectSearchFeature } from '../../store/search/search.selectors'
import { Observable, take } from 'rxjs'
import { ContactsForValue } from '../../components/contacts-form/contacts-form.component'
import {
  changeContacts,
  changeContactsValid,
} from '../../store/passengers/passengers.actions'
import {
  selectContactsValid,
  selectPassengersListValid,
} from '../../store/passengers/passengers.selectors'

@Component({
  selector: 'app-booking-process',
  templateUrl: './booking-process.component.html',
  styleUrls: ['./booking-process.component.scss'],
})
export class BookingProcessComponent implements OnInit {
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  passengersListValid = false

  contactsValid = false

  // allFormsValid = this.passengersListValid && this.contactsValid

  passengersListValid$: Observable<boolean> = this.store.select(
    selectPassengersListValid
  )

  contactsValid$: Observable<boolean> = this.store.select(selectContactsValid)

  ngOnInit(): void {
    this.passengersListValid$.subscribe((value) => {
      this.passengersListValid = value
    })

    this.contactsValid$.subscribe((value) => {
      this.contactsValid = value
    })
  }

  onContactsFormChange(e: ContactsForValue) {
    this.store.dispatch(
      changeContacts({
        countryCode: e.countryCode || '',
        email: e.email || '',
        phone: e.phone || '',
      })
    )
    this.store.dispatch(changeContactsValid({ valid: e.valid }))
  }

  clickToContinue() {
    this.router.navigate(['summary'], {})
  }

  clickToBack() {
    this.store
      .select(selectSearchFeature)
      .pipe(take(1))
      .subscribe(({ search }) => {
        this.router.navigate(['selection'], {
          queryParams: {
            fromKey: search.route.from?.key,
            toKey: search.route.to?.key,
            forwardDate: search.dates.start?.toISOString(),
            backDate: search.dates.end?.toISOString(),
          },
        })
      })
  }
}
