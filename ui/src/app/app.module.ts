import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BookComponent } from './shared/animations/book/book.component';
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';
import { DisabledComponent } from './shared/animations/disabled/disabled.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    BookComponent,
    DisabledComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { 
  constructor (){
    defineElement(lottie.loadAnimation)
  }
}
