import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {IAppState} from '../state/app.state';
import {select, Store} from '@ngrx/store';
import {EFruitActions, GetFruit, GetFruits, GetFruitsSuccess, GetFruitSuccess} from '../actions/fruit.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {selectFruitList} from '../selectors/fruit.selectors';
import {FruitService} from '../../services/fruit.service';
import {Fruit} from '../../models/fruit';

@Injectable()
export class FruitEffects {
  @Effect()
  getFruit$ = this._actions$.pipe(
    ofType<GetFruit>(EFruitActions.GetFruit),
    map(action => action.payload),
    switchMap(number => this._fruitService.getFruit(number)),
    switchMap((fruit: Fruit) => of(new GetFruitSuccess(fruit)))
  );

  @Effect()
  getFruits$ = this._actions$.pipe(
    ofType<GetFruits>(EFruitActions.GetFruits),
    switchMap(() => this._fruitService.getFruits()),
    switchMap((fruits: Fruit[]) => of(new GetFruitsSuccess(fruits)))
  );

  constructor(
    private _fruitService: FruitService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}
}
