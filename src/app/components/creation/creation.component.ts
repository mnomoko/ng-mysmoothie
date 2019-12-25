import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Smoothie } from '../../models/smoothie';
import { getJuice, getJuices } from '../../../commons/enums/juices';
import {select, Store} from '@ngrx/store';
import {selectFruitList} from '../../store/selectors/fruit.selectors';
import {IAppState} from '../../store/state/app.state';
import {GetFruits} from '../../store/actions/fruit.actions';
import {CreateSmoothie} from '../../store/actions/smoothie.actions';
import {selectSelectedSmoothie} from '../../store/selectors/smoothie.selectors';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {
  fruits$ = this._store.pipe(select(selectFruitList));

  @Input() smoothie: Smoothie;
  jus: any[] = [];

  constructor(private _store: Store<IAppState>, private _router: Router) {}

  ngOnInit() {
    this.jus = this.getJuices();
    this._store.dispatch(new GetFruits());
  }

  private getJuices() {
    return getJuices().map(k => getJuice(k));
  }

  public createSmoothie(smoothie: Smoothie) {
    console.log('smoothie : ', smoothie);
    this._store.dispatch(new CreateSmoothie(smoothie));
  }
}
