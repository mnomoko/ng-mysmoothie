import {Smoothie} from '../../models/smoothie';

export interface ISmoothieState {
  smoothies: Smoothie[];
  selectedSmoothie: Smoothie;
}

export const initialSmoothieState: ISmoothieState = {
  smoothies: null,
  selectedSmoothie: null
};
