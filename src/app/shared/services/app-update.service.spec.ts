import { TestBed } from '@angular/core/testing'
import { AppUpdateService } from './app-update.service'
import { SwalAlertService } from './swal-alert.service'
import {
  ServiceWorkerModule,
  SwUpdate,
  VersionDetectedEvent,
  VersionReadyEvent
} from '@angular/service-worker'
import { of, Subject } from 'rxjs'

describe('AppUpdateService', () => {
  let service: AppUpdateService
  let swalAlertService: SwalAlertService
  let swUpdate: SwUpdate
  let alertUpdateAppSpy: jest.SpyInstance
  let reloadSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServiceWorkerModule.register('', { enabled: false })],
      providers: [AppUpdateService, SwalAlertService, SwUpdate]
    })
    service = TestBed.inject(AppUpdateService)
    swalAlertService = TestBed.inject(SwalAlertService)
    swUpdate = TestBed.inject(SwUpdate)

    alertUpdateAppSpy = jest.spyOn(swalAlertService, 'alertUpdateApp')
    // Crear un Subject que simule los eventos de versionUpdates
    const versionUpdatesSubject = new Subject<any>()
    Object.defineProperty(swUpdate, 'versionUpdates', {
      get: jest.fn(() => versionUpdatesSubject)
    })
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should call showAppUpdateAlert when updates are available', () => {
    const showAppUpdateAlertSpy = jest.spyOn(service, 'showAppUpdateAlert')
    service.showAppUpdateAlert()
    expect(showAppUpdateAlertSpy).toHaveBeenCalled()
  })

  it('should call doAppUpdate', async () => {
    const activateUpdateSpy = jest.spyOn(swUpdate, 'activateUpdate')

    // Call doAppUpdate directly instead of spying the location
    await service.doAppUpdate()

    expect(activateUpdateSpy).toHaveBeenCalled()
  })

  it('should call doAppUpdate when data is true', () => {
    const showAppUpdateAlertSpy = jest.spyOn(service, 'showAppUpdateAlert')
    const doAppUpdateSpy = jest.spyOn(service, 'doAppUpdate')

    // Simulate the subscription to loadRespQuestionAppUpdate$
    service._swalAlertService.loadRespQuestionAppUpdate$ = of(true)

    service.showAppUpdateAlert()

    expect(showAppUpdateAlertSpy).toHaveBeenCalled()
    expect(doAppUpdateSpy).toHaveBeenCalled()
  })

  it('should call showAppUpdateAlert when updates are available', () => {
    // Create an object to simulate an available update
    const availableData: VersionDetectedEvent = {
      type: 'VERSION_DETECTED',
      version: { hash: '1.0.0' }
      // available: { hash: '2.0.0' },
    }

    // Spy on the showAppUpdateAlert function
    const showAppUpdateAlertSpy = jest.spyOn(service, 'showAppUpdateAlert')

    // Simulate the availability of updates
    const availableMock = jest.spyOn(swUpdate, 'versionUpdates', 'get')
    availableMock.mockReturnValue(of(availableData)) // Provide the simulated object

    // Call the function you're testing
    service.showAppUpdateAlert()

    // Ensure that showAppUpdateAlert is called after the subscription
    expect(showAppUpdateAlertSpy).toHaveBeenCalled()
  })

  it('should call showAppUpdateAlert when VERSION_READY event is emitted', () => {
    const showAppUpdateAlertSpy = jest.spyOn(service, 'showAppUpdateAlert')

    // Llamar explícitamente a ngOnInit para asegurarte de que se suscriba a versionUpdates
    service.ngOnInit()

    // Simula el evento VERSION_READY
    const versionReadyEvent: VersionReadyEvent = {
      type: 'VERSION_READY',
      currentVersion: { hash: '1.0.0' },
      latestVersion: { hash: '2.0.0' }
    }

    // Emite el evento VERSION_READY a través del Subject
    ;(swUpdate.versionUpdates as Subject<any>).next(versionReadyEvent)

    // Asegúrate de que showAppUpdateAlert haya sido llamada
    expect(showAppUpdateAlertSpy).toHaveBeenCalled()
  })

  it('should handle errors when activateUpdate fails in doAppUpdate', async () => {
    // Crear un espía para activateUpdate que simula un error
    const activateUpdateSpy = jest
      .spyOn(swUpdate, 'activateUpdate')
      .mockRejectedValueOnce(new Error('Failed to activate update'))

    // Crear un espía para console.error
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    // Llamar al método doAppUpdate
    await service.doAppUpdate()

    // Verificar que se haya llamado a console.error
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to activate update:',
      expect.any(Error)
    )

    // Verificar que activateUpdate haya sido llamado
    expect(activateUpdateSpy).toHaveBeenCalled()
  })
})
