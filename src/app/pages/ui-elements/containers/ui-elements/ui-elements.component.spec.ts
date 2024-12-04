import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing'
import { UiElementsComponent } from './ui-elements.component'
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

describe('UiElementsComponent', () => {
  let component: UiElementsComponent
  let fixture: ComponentFixture<UiElementsComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UiElementsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [provideHttpClient(withInterceptorsFromDi())]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UiElementsComponent)
    component = fixture.componentInstance
    jest.clearAllMocks()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
