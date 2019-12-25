import {IAppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {IFruitState} from '../state/fruit.state';

const selectFruits = (state: IAppState) => state.fruits;

export const selectFruitList = createSelector(
  selectFruits,
  (state: IFruitState) => state.fruits
);

export const selectSelectedFruit = createSelector(
  selectFruits,
  (state: IFruitState) => state.selectedFruit
);
