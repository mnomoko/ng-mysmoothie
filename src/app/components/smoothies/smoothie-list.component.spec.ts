import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {SmoothieListComponent} from './smoothie-list.component';
import {GetSmoothies} from '../../store/actions/smoothie.actions';
import {SharedModule} from '../../shared.module';
import {cold, getTestScheduler} from 'jasmine-marbles';
import {Smoothie} from '../../models/smoothie';
import {appReducers} from '../../store/reducers/app.reducers';
import {EffectsModule} from '@ngrx/effects';
import {SmoothieEffects} from '../../store/effects/smoothie.effects';
import {FruitService} from '../../services/fruit.service';
import {SmoothieService} from '../../services/smoothie.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SmoothieListComponent', () => {
  let _smoothieService: any;

  let component: SmoothieListComponent;
  let fixture: ComponentFixture<SmoothieListComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [SmoothieListComponent],
      imports: [RouterTestingModule, SharedModule,
        HttpClientTestingModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([SmoothieEffects]),
      ],
      providers: [
        Store,
        FruitService,
        SmoothieService
      ]
    }).compileComponents();

    _smoothieService = TestBed.get(SmoothieService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmoothieListComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit()', () => {
    it('should dispatch an the GetSmoothies action in ngOnInit lifecycle', () => {
      const action = new GetSmoothies();
      const store = TestBed.get(Store);
      const spy = jest.spyOn(store, 'dispatch');

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('should selectAllSmoothies', () => {
      const smoothies: Smoothie[] = [];
      spyOn(_smoothieService, 'getSmoothies').and.returnValue(of(smoothies));

      fixture.detectChanges();

      const expected = cold('a', { a: smoothies });
      expect(component.smoothies$).toBeObservable(expected);
    });
  });

  describe('users', () => {
    it('should be an observable of an array of smoothies objects', done => {
      const smoothies: Smoothie[] = [];
      spyOn(_smoothieService, 'getSmoothies').and.returnValue(of(smoothies));

      fixture.detectChanges();

      component.smoothies$.subscribe(componentUsers => {
        expect(componentUsers).toEqual(smoothies);
        done();
      });

      getTestScheduler().flush();
    });
  });
});
