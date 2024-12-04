import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsContainerComponent } from './forms-container.component'
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

describe('FormsContainerComponent', () => {
  let component: FormsContainerComponent
  let fixture: ComponentFixture<FormsContainerComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormsContainerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [provideHttpClient(withInterceptorsFromDi())]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsContainerComponent)
    component = fixture.componentInstance
    jest.clearAllMocks()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
