import {Fruit} from '../../models/fruit';

export interface IFruitState {
  fruits: Fruit[];
  selectedFruit: Fruit;
}

export const initialFruitsState: IFruitState = {
  fruits: null,
  selectedFruit: null
};
