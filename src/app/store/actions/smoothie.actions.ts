import {Action} from '@ngrx/store';
import {Smoothie} from '../../models/smoothie';

export enum ESmoothieActions {
  GetSmoothies = '[Smoothie] Get smoothies',
  GetSmoothiesSuccess = '[Smoothie] Get smoothies success',
  GetSmoothie = '[Smoothie] Get smoothie',
  GetSmoothieSuccess = '[Smoothie] Get smoothie success',
  GetSmoothieAndFruits = '[Smoothie] Get smoothie and fruits',
  GetSmoothieAndFruitsSuccess = '[Smoothie] Get smoothie and fruits success',
  CreateSmoothie = '[Smoothie] Create smoothie',
  CreateSmoothieSuccess = '[Smoothie] Create smoothie success'
}

export class GetSmoothies implements Action {
  public readonly type = ESmoothieActions.GetSmoothies;
}

export class GetSmoothiesSuccess implements Action {
  public readonly type = ESmoothieActions.GetSmoothiesSuccess;
  constructor(public payload: Smoothie[]) {}
}

export class GetSmoothie implements Action {
  public readonly type = ESmoothieActions.GetSmoothie;
  constructor(public payload: number) {}
}

export class GetSmoothieSuccess implements Action {
  public readonly type = ESmoothieActions.GetSmoothieSuccess;
  constructor(public payload: Smoothie) {}
}

export class GetSmoothieAndFruits implements Action {
  public readonly type = ESmoothieActions.GetSmoothieAndFruits;
  constructor(public payload: number) {}
}

export class GetSmoothieAndFruitsSuccess implements Action {
  public readonly type = ESmoothieActions.GetSmoothieAndFruitsSuccess;
  constructor(public payload: Smoothie) {}
}

export class CreateSmoothie implements Action {
  public readonly type = ESmoothieActions.CreateSmoothie;
  constructor(public payload: Smoothie) {}
}

export class CreateSmoothieSuccess implements Action {
  public readonly type = ESmoothieActions.CreateSmoothieSuccess;
  constructor(public payload: Smoothie) {}
}

export type SmoothieActions = GetSmoothies | GetSmoothiesSuccess | GetSmoothie | GetSmoothieSuccess | CreateSmoothie | CreateSmoothieSuccess | GetSmoothieAndFruits | GetSmoothieAndFruitsSuccess;
