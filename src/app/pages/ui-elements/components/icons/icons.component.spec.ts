/* tslint:disable:no-unused-variable */
import { waitForAsync , ComponentFixture, TestBed } from '@angular/core/testing'
import { IconsComponent } from './icons.component'
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'

describe('IconsComponent', () => {
  let component: IconsComponent
  let fixture: ComponentFixture<IconsComponent>

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      declarations: [IconsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
