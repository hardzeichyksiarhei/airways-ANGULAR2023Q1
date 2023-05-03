import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { CoreModule } from './core/core.module'
import { AirwaysModule } from './airways/airways.module'

import { environment } from '../environments'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    AirwaysModule,
    StoreModule.forRoot({}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
