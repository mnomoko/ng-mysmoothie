import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import {Smoothie} from '../../models/smoothie';
import {select, Store} from '@ngrx/store';
import {selectSelectedSmoothie} from '../../store/selectors/smoothie.selectors';
import {IAppState} from '../../store/state/app.state';
import {CreateSmoothie, GetSmoothieAndFruits} from '../../store/actions/smoothie.actions';
import {getJuice, getJuices} from '../../../commons/enums/juices';
import {selectFruitList} from '../../store/selectors/fruit.selectors';

@Component({
  selector: 'app-smoothie',
  templateUrl: './smoothie.component.html',
  styleUrls: ['./smoothie.component.css']
})
export class SmoothieComponent implements OnInit {
  smoothie$ = this._store.pipe(select(selectSelectedSmoothie));
  fruits$ = this._store.pipe(select(selectFruitList));
  @Input() smoothie: Smoothie;
  jus: any[] = [];

  constructor(private _store: Store<IAppState>, private _route: ActivatedRoute) {}

  ngOnInit() {
    this.jus = this.getJuices();
    this._route.params.pipe(
      map(params => params.id),
      map(id => this._store.dispatch(new GetSmoothieAndFruits(id)))
    ).subscribe();
  }

  private getJuices() {
    return getJuices().map(k => getJuice(k));
  }

  public upateSmoothie(smoothie: Smoothie) {
    console.log('smoothie : ', smoothie);
    this._store.dispatch(new CreateSmoothie(smoothie));
  }
}
