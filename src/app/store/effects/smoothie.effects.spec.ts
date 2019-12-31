import {provideMockActions} from '@ngrx/effects/testing';
import {TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import {Observable} from 'rxjs';
import {SmoothieEffects} from './smoothie.effects';
import {SmoothieService} from '../../services/smoothie.service';
import {IAppState} from '../state/app.state';
import {GetSmoothie, GetSmoothies, GetSmoothiesSuccess, GetSmoothieSuccess} from '../actions/smoothie.actions';
import {Smoothie} from '../../models/smoothie';
import {cold, hot} from 'jasmine-marbles';
import {Router} from '@angular/router';
import {appReducers} from '../reducers/app.reducers';
import {Gout} from '../../../commons/enums/constants';
import {Fruit} from '../../models/fruit';

describe('Smoothie effects', () => {

  let actions: Observable<any>;
  let effects: SmoothieEffects;
  let smoothieService: jasmine.SpyObj<SmoothieService>;
  let store: Store<IAppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...appReducers,
        }),
      ],
      providers: [
        SmoothieEffects,
        provideMockActions(() => actions),
        {
          provide: SmoothieService,
          useValue: {
            getSmoothies: jasmine.createSpy(),
            getSmoothie: jasmine.createSpy()
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.get(SmoothieEffects);
    smoothieService = TestBed.get(SmoothieService);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should return a list of smoothies', () => {
    const smoothies: Smoothie[] = [];
    const action = new GetSmoothies();
    const outcome = new GetSmoothiesSuccess(smoothies);

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: smoothies });
    smoothieService.getSmoothies.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.getSmoothies$).toBeObservable(expected);
    expect(smoothieService.getSmoothies).toHaveBeenCalled();
  });

  it('should return a smoothie', () => {
    const fruit: Fruit = { id: 1, name: 'Abricot', type: 'fruit', gouts: ['sucre'], preparation: 'preparation...'};
    const fruit2: Fruit = { id: 2, name: 'Peche', type: 'fruit', gouts: ['sucre'], preparation: 'preparation...'};
    const smoothie: Smoothie = {id: 1, name: 'Smoothie peche abricot', fruits: [fruit, fruit2], jus: {id: 1, name: 'Orange', gout: Gout.SUCRE}, description: 'Description...'};

    const action = new GetSmoothie(1);
    const outcome = new GetSmoothieSuccess(smoothie);

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: smoothie });
    smoothieService.getSmoothie.and.returnValue(response);

    const expected = cold('--b', { b: outcome });
    expect(effects.getSmoothie$).toBeObservable(expected);
    expect(smoothieService.getSmoothie).toHaveBeenCalled();
  });
});


