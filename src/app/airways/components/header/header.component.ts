import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Location } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import { Store } from '@ngrx/store'

import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component'
import { Observable } from 'rxjs'
import { selectAuth } from '../../store/auth/auth.selectors'
import { clearAuthError, logout } from '../../store/auth/auth.actions'
import { IStep } from '../../store/settings/settings.reducer'
import { selectSteps } from '../../store/settings/settings.selectors'
import { updateSteps } from '../../store/settings/settings.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private store: Store
  ) {}

  showStepper = false

  isAuth$: Observable<string | null> = this.store.select(selectAuth)

  steps$: Observable<IStep[]> = this.store.select(selectSteps)

  ngOnInit(): void {
    this.changeStepper(this.router.url)

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.location.path()
        this.changeStepper(url)
      }
    })
  }

  changeStepper(url: string) {
    if (url.indexOf('/selection') !== -1) {
      this.showStepper = true

      const steps = [
        { key: 'selection', editable: true, saved: false },
        { key: 'booking', editable: false, saved: false },
        { key: 'summary', editable: false, saved: false },
      ]
      this.store.dispatch(updateSteps({ steps }))
    } else if (url.indexOf('/booking') !== -1) {
      this.showStepper = true

      const steps = [
        { key: 'selection', editable: false, saved: true },
        { key: 'booking', editable: true, saved: false },
        { key: 'summary', editable: false, saved: false },
      ]
      this.store.dispatch(updateSteps({ steps }))
    } else if (url.indexOf('/summary') !== -1) {
      this.showStepper = true

      const steps = [
        { key: 'selection', editable: false, saved: true },
        { key: 'booking', editable: false, saved: true },
        { key: 'summary', editable: true, saved: false },
      ]
      this.store.dispatch(updateSteps({ steps }))
    } else {
      this.showStepper = false

      const steps = [
        { key: 'selection', editable: false, saved: false },
        { key: 'booking', editable: false, saved: false },
        { key: 'summary', editable: false, saved: false },
      ]
      this.store.dispatch(updateSteps({ steps }))
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.store.dispatch(clearAuthError())
    this.dialog.open(AuthDialogComponent, {
      width: '514px',
      ariaModal: true,
      enterAnimationDuration,
      exitAnimationDuration,
    })
    this.checkAuthAndCloseDialog()
  }

  closeDialog() {
    this.dialog.closeAll()
  }

  checkAuthAndCloseDialog() {
    this.isAuth$.subscribe((value) => {
      if (value) {
        this.closeDialog()
      }
    })
  }

  onLogout() {
    this.store.dispatch(logout())
  }

  getHeaderClasses() {
    return {
      fill:
        this.router.url.indexOf('/selection') !== -1 ||
        this.router.url.indexOf('/booking') !== -1 ||
        this.router.url.indexOf('/summary') !== -1,
    }
  }
}
