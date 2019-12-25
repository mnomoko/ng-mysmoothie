import {IFruitState, initialFruitsState} from '../state/fruit.state';
import {EFruitActions, FruitActions} from '../actions/fruit.actions';

export const fruitReducers = (
  state = initialFruitsState,
  action: FruitActions
): IFruitState => {
  switch (action.type) {
    case EFruitActions.GetFruitsSuccess: {
      return {
        ...state,
        fruits: action.payload
      };
    }
    case EFruitActions.GetFruitSuccess: {
      return {
        ...state,
        selectedFruit: action.payload
      };
    }
    default:
      return state;
  }
};
