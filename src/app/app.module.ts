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
import {SmoothieCardComponent} from './components/smoothies/smoothie-card.component';

@NgModule({
  declarations: [AppComponent, routableComponents, NavBarComponent, SmoothieCardComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule, BrowserAnimationsModule, AppRoutingModule, MaterialsModule, FlexLayoutModule],
  providers: [FruitService, SmoothieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
