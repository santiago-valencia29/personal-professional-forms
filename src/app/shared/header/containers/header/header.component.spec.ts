import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Observable } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let breakpointObserver: BreakpointObserver;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [BreakpointObserver],
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    // Inicializar el componente
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    breakpointObserver = TestBed.inject(BreakpointObserver);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isMenuOpened as false', () => {
    expect(component.isMenuOpened).toBe(false);
  });

  it('should open the menu and emit true', () => {
    const emitSpy = jest.spyOn(component.isShowSidebar, 'emit') as jest.SpyInstance<void, [boolean]>;

    component.openMenu();
    expect(component.isMenuOpened).toBe(true);
    expect(emitSpy).toHaveBeenCalledWith(true);

    emitSpy.mockRestore();
  });

  it('should close the menu and emit false', () => {
    const emitSpy = jest.spyOn(component.isShowSidebar, 'emit') as jest.SpyInstance<void, [boolean]>;

    component.openMenu();
    component.openMenu();
    expect(component.isMenuOpened).toBe(false);
    expect(emitSpy).toHaveBeenCalledWith(false);

    emitSpy.mockRestore();
  });

  it('should set showIconTitleResponsive to true when matches', () => {
    jest.spyOn(breakpointObserver, 'observe').mockReturnValue(of({ matches: true }) as Observable<BreakpointState>);

    component.ngOnInit();
    expect(component.showIconTitleResponsive).toBe(true);
  });

  it('should set showIconTitleResponsive to false when does not match', () => {
    jest.spyOn(breakpointObserver, 'observe').mockReturnValue(of({ matches: false }) as Observable<BreakpointState>);

    component.ngOnInit();
    expect(component.showIconTitleResponsive).toBe(false);
  });
});
