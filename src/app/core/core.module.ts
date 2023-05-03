import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'
import { DefaultComponent } from './layouts/default/default.component'

@NgModule({
  declarations: [HeaderComponent, FooterComponent, DefaultComponent],
  imports: [CommonModule],
})
export class CoreModule {}
