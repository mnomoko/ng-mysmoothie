import {Juice} from '../../commons/enums/juices';
import {Fruit} from './fruit';

export class Smoothie {
  id: number;
  name: string;
  fruits: Fruit[];
  jus: Juice;
  description: string;
}
