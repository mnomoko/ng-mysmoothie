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
import {StoreModule} from '@ngrx/store';
import {appReducers} from './store/reducers/app.reducers';
import {EffectsModule} from '@ngrx/effects';
import {FruitEffects} from './store/effects/fruit.effects';
import {SmoothieEffects} from './store/effects/smoothie.effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent, routableComponents],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([FruitEffects, SmoothieEffects]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [FruitService, SmoothieService],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: [SmoothieModalComponent]
})
export class AppModule { }
