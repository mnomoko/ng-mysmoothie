import {ISmoothieState, initialSmoothieState} from '../state/smoothie.state';
import {ESmoothieActions, SmoothieActions} from '../actions/smoothie.actions';

export const smoothieReducers = (
  state = initialSmoothieState,
  action: SmoothieActions
): ISmoothieState => {
  switch (action.type) {
    case ESmoothieActions.GetSmoothiesSuccess: {
      return {
        ...state,
        smoothies: action.payload
      };
    }
    case ESmoothieActions.GetSmoothieSuccess: {
      return {
        ...state,
        selectedSmoothie: action.payload
      };
    }
    case ESmoothieActions.CreateSmoothieSuccess: {
      return {
        ...state,
        selectedSmoothie: action.payload
      };
    }
    default:
      return state;
  }
};
