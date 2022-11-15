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
import { SobreComponent } from './components/sobre/sobre.component';
import { AcervoComponent } from './components/acervo/acervo.component';
import { HomeComponent } from './components/home/home.component';
import { ContatoComponent } from './components/contato/contato.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HeartComponent } from './shared/animations/heart/heart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    BookComponent,
    DisabledComponent,
    SobreComponent,
    AcervoComponent,
    HomeComponent,
    ContatoComponent,
    CadastroComponent,
    HeartComponent, 
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule,],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
