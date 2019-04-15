import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule, routableComponents} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SmoothieService} from './services/smoothie.service';
import {NavBarComponent} from './components/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialsModule} from './materials-module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FruitService} from './services/fruit.service';
import {SmoothieCardComponent, SmoothieModalComponent} from './components/smoothies/smoothie-card.component';
import {SelectCommunComponent} from './components/elements_commun/select/select-commun.component';
import {RadioCommunComponent} from './components/elements_commun/radio/radio-commun.component';
import {ButtonToggleCommunComponent} from './components/elements_commun/button_toggle/button-toggle-commun.component';

@NgModule({
  declarations: [AppComponent, routableComponents, NavBarComponent, SmoothieCardComponent, SmoothieModalComponent, SelectCommunComponent, RadioCommunComponent, ButtonToggleCommunComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule, BrowserAnimationsModule, AppRoutingModule, MaterialsModule, FlexLayoutModule],
  providers: [FruitService, SmoothieService],
  bootstrap: [AppComponent],
  entryComponents: [SmoothieModalComponent]
})
export class AppModule { }
