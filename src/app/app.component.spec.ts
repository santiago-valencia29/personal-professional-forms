import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import * as AOS from 'aos';
import { AppUpdateService } from './shared/services/app-update.service';
import { ServiceWorkerModule } from '@angular/service-worker';

jest.mock('aos', () => ({
  init: jest.fn(),
}));

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ServiceWorkerModule.register('', { enabled: false })],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [AppUpdateService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize AOS on ngOnInit', () => {
    const aosInitSpy = jest.spyOn(AOS, 'init');
    component.ngOnInit();
    expect(aosInitSpy).toHaveBeenCalled();
  });
});
