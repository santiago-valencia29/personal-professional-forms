import { TestBed, waitForAsync , inject } from '@angular/core/testing'
import { SwalAlertService } from './swal-alert.service'
import Swal from 'sweetalert2'

describe('Service: SwalAlert', () => {
  let service: SwalAlertService
  let SwalFireSpy: jest.SpyInstance

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwalAlertService]
    })
  })

  beforeEach(inject([SwalAlertService], (s: SwalAlertService) => {
    service = s
    SwalFireSpy = jest.spyOn(Swal, 'fire')
  }))

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return the correct infoBackground color', () => {
    const icon = 'info'
    const color = service.backgroundChangeIcon(icon)
    expect(color).toBe(service.variables.infoBackground)
  })

  it('should return the correct successBackground color', () => {
    const icon = 'success'
    const color = service.backgroundChangeIcon(icon)
    expect(color).toBe(service.variables.successBackground)
  })

  it('should return the correct errorBackground color', () => {
    const icon = 'error'
    const color = service.backgroundChangeIcon(icon)
    expect(color).toBe(service.variables.errorBackground)
  })

  it('should return the correct warningBackground color', () => {
    const icon = 'warning'
    const color = service.backgroundChangeIcon(icon)
    expect(color).toBe(service.variables.warningBackground)
  })

  it('should return the infoBackground color for an unknown icon', () => {
    const icon = 'unknownIcon'
    const color = service.backgroundChangeIcon(icon)
    expect(color).toBe(service.variables.infoBackground)
  })

  it('should close Swal alert', () => {
    const spy = jest.spyOn(Swal, 'close')
    service.swalAlertClose()
    expect(spy).toHaveBeenCalled()
  })

  it('should call Swal.fire with the correct arguments', () => {
    const spy = jest.spyOn(Swal, 'fire')

    const title = 'Test Title'
    const message = 'Test Message'
    const icon = 'success'
    const timer = 3000

    service.toast(title, message, icon, timer)

    expect(spy).toHaveBeenCalledWith({
      title: title,
      text: message,
      icon: icon,
      toast: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      position: 'top-end',
      timerProgressBar: true,
      didOpen: expect.any(Function),
      showCloseButton: true,
      showConfirmButton: false,
      background: service.backgroundChangeIcon(icon),
      timer: timer
    })
  })

  it('should call Swal.fire with the correct arguments for toastTarget', () => {
    const spy = jest.spyOn(Swal, 'fire')

    const title = 'Test Title'
    const message = 'Test Message'
    const icon = 'success'
    const timer = 3000
    const target = 'body' // Mock the target element
    const position = 'top-start' // Optional position

    service.toastTarget(title, message, icon, timer, target, position)

    expect(spy).toHaveBeenCalledWith({
      title: title,
      html: message,
      target: target,
      icon: icon,
      showClass: {
        popup: 'animate__animated animate__zoomIn animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut'
      },
      customClass: {
        container: 'position-absolute'
      },
      timerProgressBar: true,
      didOpen: expect.any(Function),
      toast: true,
      position: position,
      showCloseButton: true,
      showConfirmButton: false,
      background: service.backgroundChangeIcon(icon),
      timer: timer
    })
  })

  it('should call Swal.fire with the correct arguments for toastErrorService', () => {
    service.toastErrorService()

    expect(SwalFireSpy).toHaveBeenCalledWith({
      title: 'Error',
      html: expect.any(String),
      icon: 'error',
      position: 'top',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: true,
      confirmButtonColor: expect.any(String),
      confirmButtonText: 'Retry',
      background: expect.any(String)
    })
  })

  it('should call respQuestion with true if user confirms', async () => {
    const confirmMock = jest.fn(() => Promise.resolve({ isConfirmed: true }))
    SwalFireSpy.mockImplementation(confirmMock)

    const respQuestionSpy = jest.spyOn(service, 'respQuestion')

    await service.toastErrorService()

    expect(respQuestionSpy).toHaveBeenCalledWith(true)
  })

  it('should call respQuestion with false if user does not confirm', async () => {
    const confirmMock = jest.fn(() => Promise.resolve({ isConfirmed: false }))
    SwalFireSpy.mockImplementation(confirmMock)

    const respQuestionSpy = jest.spyOn(service, 'respQuestion')

    await service.toastErrorService()

    expect(respQuestionSpy).toHaveBeenCalledWith(false)
  })

  it('should call Swal.fire with loading message', () => {
    const loadingMessage = 'Loading...'

    service.loading(loadingMessage)

    expect(SwalFireSpy).toHaveBeenCalledWith({
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      icon: 'info',
      html: `<h6 style="color:#000000">${loadingMessage}</h6>`,
      position: 'top',
      showClass: {
        popup: 'animate__animated animate__zoomIn animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut animate__faster'
      }
    })
  })

  it('should call Swal.fire with center loading message', () => {
    const loadingMessage = 'Loading...'

    service.loadingCenter(loadingMessage)

    expect(SwalFireSpy).toHaveBeenCalledWith({
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: 'info',
      html: `<h6 style="color:#000000">${loadingMessage}</h6>`,
      position: 'center',
      showClass: {
        popup: 'animate__animated animate__zoomIn animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut animate__faster'
      }
    })
  })

  it('should call Swal.fire with target loading message', () => {
    const loadingMessage = 'Loading...'
    const target = '#custom-target'

    service.loadingTarget(loadingMessage, target)

    expect(SwalFireSpy).toHaveBeenCalledWith({
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: 'info',
      html: `<h6 style="color:#000000">${loadingMessage}</h6>`,
      position: 'top',
      showClass: {
        popup: 'animate__animated animate__zoomIn animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut animate__faster'
      },
      customClass: {
        container: 'position-absolute'
      },
      target: target
    })
  })

  it('should call Swal.fire with questionAction parameters', () => {
    const title = 'Confirmation'
    const message = 'Are you sure?'
    const icon = 'question'
    const confirmButtonText = 'Yes'
    const cancelButtonText = 'No'
    const target = '#custom-target' // Define el valor del target

    service.questionAction(
      title,
      message,
      icon,
      confirmButtonText,
      cancelButtonText,
      target
    )

    expect(SwalFireSpy).toHaveBeenCalledWith({
      title: `<h6>${title}</h6>`,
      text: message,
      icon: icon,
      customClass: {
        container: 'position-absolute'
      },
      showClass: {
        popup: 'animate__animated animate__zoomIn animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut animate__faster'
      },
      backdrop: true,
      allowOutsideClick: false,
      target: target || 'body',
      position: 'top',
      showCancelButton: true,
      confirmButtonColor: service.variables.confirmButtonColor,
      cancelButtonColor: service.variables.cancelButtonColor,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    })
  })

  it('should return initial value when data is null', () => {
    const initialValue = service.loadRespQuestion.getValue()
    const result = service.respQuestion(null)

    expect(result).toEqual(initialValue)
  })

  it('should update the value when data is provided', () => {
    const newValue = true
    const result = service.respQuestion(newValue)

    expect(result).toEqual(newValue)
  })

  it('should call Swal.fire with alertUpdateApp parameters', () => {
    service.alertUpdateApp()

    expect(SwalFireSpy).toHaveBeenCalledWith({
      html: '<h6 style="color:#000000">Update Available</h6>',
      position: 'center',
      icon: 'info',
      showClass: {
        popup: 'animate__animated animate__zoomIn animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut animate__faster'
      },
      showConfirmButton: true,
      confirmButtonText: 'Ok',
      confirmButtonColor: service.variables.confirmButtonColor,
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  })

  it('should return initial value when data is null loadRespQuestionAppUpdate', () => {
    const initialValue = service.loadRespQuestionAppUpdate.getValue()
    const result = service.respQuestionAppUpdate(null)

    expect(result).toEqual(initialValue)
  })

  it('should update the value when data is provided respQuestionAppUpdate', () => {
    const newValue = true
    const result = service.respQuestionAppUpdate(newValue)

    expect(result).toEqual(newValue)
  })

})
