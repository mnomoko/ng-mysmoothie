import { provideMockActions } from '@ngrx/effects/testing';
import {TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {GetFruit, GetFruits, GetFruitsSuccess, GetFruitSuccess} from '../actions/fruit.actions';
import {Fruit} from '../../models/fruit';
import {FruitEffects} from './fruit.effects';
import {cold, hot} from 'jasmine-marbles';
import {FruitService} from '../../services/fruit.service';
import {MockStore} from '@ngrx/store/testing';
import {ISmoothieState} from '../state/smoothie.state';

describe('Fruit effects', () => {

  let actions: Observable<any>;
  let effects: FruitEffects;
  let fruitService: jasmine.SpyObj<FruitService>;
  let store: MockStore<ISmoothieState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FruitEffects,
        provideMockActions(() => actions),
        {
          provide: FruitService,
          useValue: {
            getFruits: jasmine.createSpy(),
            getFruit: jasmine.createSpy()
          }
        },
        {
          provide: Store,
          useValue: {
            pipe: jest.fn(),
            dispatch: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.get(FruitEffects);
    fruitService = TestBed.get(FruitService);
    store = TestBed.get(Store);
  });

  it('should return a list of fruits', () => {
    const fruits: Fruit[] = [];
    const action = new GetFruits();
    const outcome = new GetFruitsSuccess(fruits);

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: fruits });
    fruitService.getFruits.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.getFruits$).toBeObservable(expected);
    expect(fruitService.getFruits).toHaveBeenCalled();
  });

  it('should return a fruit', () => {
    const fruit: Fruit = { id: 1, name: 'Abricot', type: 'fruit', gouts: ['sucre'], preparation: 'preparation...'};

    const action = new GetFruit(1);
    const outcome = new GetFruitSuccess(fruit);

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: fruit });
    fruitService.getFruit.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.getFruit$).toBeObservable(expected);
    expect(fruitService.getFruit).toHaveBeenCalled();
  });
});
