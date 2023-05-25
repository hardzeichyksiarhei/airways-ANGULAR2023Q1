import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AuthDialogComponent, {
      width: '514px',
      ariaModal: true,
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }
}
