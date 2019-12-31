import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {IAppState} from '../state/app.state';
import {Store} from '@ngrx/store';
import {
  CreateSmoothie, CreateSmoothieSuccess,
  ESmoothieActions,
  GetSmoothie,
  GetSmoothies,
  GetSmoothiesSuccess,
  GetSmoothieSuccess
} from '../actions/smoothie.actions';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {SmoothieService} from '../../services/smoothie.service';
import {Smoothie} from '../../models/smoothie';
import {Router} from '@angular/router';
import {GetFruits} from '../actions/fruit.actions';

@Injectable()
export class SmoothieEffects {
  @Effect()
  getSmoothieAndFruits$ = this._actions$.pipe(
    ofType<GetSmoothie>(ESmoothieActions.GetSmoothieAndFruits),
    mergeMap((action) => [
      new GetSmoothie(action.payload),
      new GetFruits()
    ])
  );

  @Effect()
  getSmoothie$ = this._actions$.pipe(
    ofType<GetSmoothie>(ESmoothieActions.GetSmoothie),
    switchMap((action) => this._smoothieService.getSmoothie(action.payload)),
    switchMap((selectedSmoothie: Smoothie) => of(new GetSmoothieSuccess(selectedSmoothie)))
  );

  @Effect()
  getSmoothies$ = this._actions$.pipe(
    ofType<GetSmoothies>(ESmoothieActions.GetSmoothies),
    switchMap(() => this._smoothieService.getSmoothies()),
    switchMap((smoothies: Smoothie[]) => of(new GetSmoothiesSuccess(smoothies)))
  );

  @Effect()
  createSmoothies$ = this._actions$.pipe(
    ofType<CreateSmoothie>(ESmoothieActions.CreateSmoothie),
    switchMap((action: CreateSmoothie) => this._smoothieService.postSmoothie(action.payload)
      .pipe(
        map((smoothie: Smoothie) => new CreateSmoothieSuccess(smoothie))
      )
    )
  );

  @Effect({dispatch: false})
  createSmoothiesSuccess$ = this._actions$.pipe(
    ofType<CreateSmoothie>(ESmoothieActions.CreateSmoothieSuccess),
    tap(() => this._router.navigate(['/smoothies']))
  );

  constructor(
    private _router: Router,
    private _smoothieService: SmoothieService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}
}
