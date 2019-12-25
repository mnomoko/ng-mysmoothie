import {ActionReducerMap} from '@ngrx/store';
import {IAppState} from '../state/app.state';
import {routerReducer} from '@ngrx/router-store';
import {fruitReducers} from './fruit.reducers';
import {smoothieReducers} from './smoothie.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  fruits: fruitReducers,
  smoothies: smoothieReducers
};
