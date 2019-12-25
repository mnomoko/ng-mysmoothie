import {IAppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {ISmoothieState} from '../state/smoothie.state';
import {selectFruitList} from './fruit.selectors';

const selectSmoothies = (state: IAppState) => state.smoothies;

export const selectSmoothieList = createSelector(
  selectSmoothies,
  (state: ISmoothieState) => state.smoothies
);

export const selectSelectedSmoothie = createSelector(
  selectSmoothies,
  selectFruitList,
  (state: ISmoothieState) => state.selectedSmoothie
);
