import { State, Action, StateContext, Selector } from '@ngxs/store'
import { Injectable } from '@angular/core'
import {
  PersonalData,
  ResponsePersonalData
} from 'src/app/pages/forms/models/personal-data.model'
import { catchError, of, tap } from 'rxjs'
import { SwalAlertService } from '../services/swal-alert.service'
import { PersonalService } from 'src/app/pages/forms/services/personal.service'

// Actions
export class LoadPersonalData {
  static readonly type = '[Personal] Load Personal Data'
}

export class SavePersonal {
  static readonly type = '[Personal] Save Personal'
  constructor(public payload: PersonalData) {}
}

// State
export interface PersonalStateModel {
  personalData: PersonalData[]
}

@State<PersonalStateModel>({
  name: 'personalService',
  defaults: {
    personalData: []
  }
})
@Injectable()
export class PersonalState {
  constructor(
    private personalService: PersonalService,
    private swalAlertService: SwalAlertService
  ) {}

  @Selector()
  static getPersonalData(state: PersonalStateModel) {
    return state.personalData
  }

  @Action(LoadPersonalData)
  loadPersonalData(ctx: StateContext<PersonalStateModel>) {
    return this.personalService.getPersonal().pipe(
      tap((data: PersonalData[]) => {
        ctx.patchState({ personalData: data })
      }),
      catchError((error) => {
        this.swalAlertService.toast(
          'Error',
          'Ocurrió un error al cargar los datos personales',
          'error',
          7000
        )
        ctx.patchState({ personalData: [] })
        return of(null)
      })
    )
  }

  @Action(SavePersonal)
  savePersonal(ctx: StateContext<PersonalStateModel>, action: SavePersonal) {
    return this.personalService.savePersonal(action.payload).pipe(
      tap((response: ResponsePersonalData) => {
        if (response && response.personal) {
          const state = ctx.getState()
          const personalArray = Array.isArray(response.personal)
            ? response.personal
            : [response.personal]
          const updatedPersonalData = state.personalData
            ? [...state.personalData, ...personalArray]
            : [...personalArray]
          ctx.patchState({
            personalData: updatedPersonalData
          })
        } else {
          console.warn(
            'No personal data returned in response:',
            response.message
          )
        }
      }),
      catchError((error) => {
        console.error('Error saving personal data:', error)
        throw error
      })
    )
  }
}
