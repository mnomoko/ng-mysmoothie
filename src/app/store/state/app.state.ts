import {RouterReducerState} from '@ngrx/router-store';

import {IFruitState, initialFruitsState} from './fruit.state';
import {initialSmoothieState, ISmoothieState} from './smoothie.state';

export interface IAppState {
  router?: RouterReducerState;
  fruits: IFruitState;
  smoothies: ISmoothieState;
}

export const initialAppState: IAppState = {
  fruits: initialFruitsState,
  smoothies: initialSmoothieState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
