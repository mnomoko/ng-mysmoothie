import {IJuice, Juice} from '../../commons/enums/juices';
import {Fruit} from './fruit';

export class Smoothie {
  id: number;
  name: string;
  fruits: Fruit[];
  jus: IJuice;
  description: string;

  constructor(name: string, fruits: Fruit[], jus: IJuice, description: string) {
    this.name = name;
    this.fruits = fruits;
    this.jus = jus;
    this.description = description;
  }
}
