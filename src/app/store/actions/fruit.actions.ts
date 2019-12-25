import {Action} from '@ngrx/store';
import {Fruit} from '../../models/fruit';

export enum EFruitActions {
  GetFruits = '[Fruit] Get fruits',
  GetFruitsSuccess = '[Fruit] Get fruits success',
  GetFruit = '[Fruit] Get fruit',
  GetFruitSuccess = '[Fruit] Get fruit success'
}

export class GetFruits implements Action {
  public readonly type = EFruitActions.GetFruits;
}

export class GetFruitsSuccess implements Action {
  public readonly type = EFruitActions.GetFruitsSuccess;
  constructor(public payload: Fruit[]) {}
}

export class GetFruit implements Action {
  public readonly type = EFruitActions.GetFruit;
  constructor(public payload: number) {}
}

export class GetFruitSuccess implements Action {
  public readonly type = EFruitActions.GetFruitSuccess;
  constructor(public payload: Fruit) {}
}

export type FruitActions = GetFruits | GetFruitsSuccess | GetFruit | GetFruitSuccess;
