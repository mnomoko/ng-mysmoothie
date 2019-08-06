import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule, routableComponents} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SmoothieService} from './services/smoothie.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FruitService} from './services/fruit.service';
import {SmoothieModalComponent} from './components/smoothies/smoothie-card.component';
import {SharedModule} from './shared.module';

@NgModule({
  declarations: [AppComponent, routableComponents],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, AppRoutingModule, SharedModule],
  providers: [FruitService, SmoothieService],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: [SmoothieModalComponent]
})
export class AppModule { }
