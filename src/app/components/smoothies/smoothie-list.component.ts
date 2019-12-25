import {Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit} from '@angular/core';
import { SmoothieService } from '../../services/smoothie.service';
import {Smoothie} from '../../models/smoothie';
import {IAppState} from '../../store/state/app.state';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {GetSmoothies} from '../../store/actions/smoothie.actions';
import {selectSmoothieList} from '../../store/selectors/smoothie.selectors';

@Component({
  selector: 'app-smoothie-list',
  templateUrl: './smoothie-list.component.html',
  styleUrls: ['./smoothie-list.component.css']
})
export class SmoothieListComponent implements OnInit {
  smoothies$ = this._store.pipe(select(selectSmoothieList));
  regularDistribution = 100 / 3;

  @Input()
  smoothies: Smoothie[];

  constructor(private _store: Store<IAppState>, private _router: Router) {}

  ngOnInit() {
    this._store.dispatch(new GetSmoothies());
  }

  navigateToSmoothie(id: number) {
    this._router.navigate(['smoothie', id]);
  }
}
