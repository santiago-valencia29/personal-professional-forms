import { State, Action, StateContext, Selector } from '@ngxs/store'
import { Injectable } from '@angular/core'
import {
  ProfessionalData,
  ResponseProfessionalData
} from 'src/app/pages/forms/models/professional-data.model'
import { ProfessionalService } from 'src/app/pages/forms/services/professional.service'
import { catchError, of, tap } from 'rxjs'
import { SwalAlertService } from '../services/swal-alert.service'

// Actions
export class LoadProfessionals {
  static readonly type = '[Professional] Load Professionals'
}

export class SaveProfessional {
  static readonly type = '[Professional] Save Professional'
  constructor(public payload: ProfessionalData) {}
}

// State
export interface ProfessionalStateModel {
  professionals: ProfessionalData[]
}

@State<ProfessionalStateModel>({
  name: 'professionalService',
  defaults: {
    professionals: []
  }
})
@Injectable()
export class ProfessionalState {
  constructor(
    private professionalService: ProfessionalService,
    private swalAlertService: SwalAlertService
  ) {}

  @Selector()
  static getProfessionals(state: ProfessionalStateModel) {
    return state.professionals
  }

  @Action(LoadProfessionals)
  loadProfessionals(ctx: StateContext<ProfessionalStateModel>) {
    return this.professionalService.getProfessionals().pipe(
      tap((data) => {
        ctx.patchState({ professionals: data })
      }),
      catchError((error) => {
        this.swalAlertService.toast(
          'Error',
          'Ocurrio un error al cargar la información de profesionales',
          'error',
          7000
        )
        ctx.patchState({ professionals: [] })
        return of([])
      })
    )
  }

  @Action(SaveProfessional)
  saveProfessional(
    ctx: StateContext<ProfessionalStateModel>,
    action: SaveProfessional
  ) {
    return this.professionalService.saveProfessional(action.payload).pipe(
      tap((response: ResponseProfessionalData) => {
        if (response && response.professional) {
          const state = ctx.getState()
          const updatedProfessionals = state.professionals
            ? [...state.professionals, response.professional]
            : [response.professional]
          ctx.patchState({
            professionals: updatedProfessionals
          })
        } else {
          console.warn(
            'No professional data returned in response:',
            response.message
          )
        }
      }),
      catchError((error) => {
        console.error('Error saving professional:', error)
        throw error
      })
    )
  }
}
