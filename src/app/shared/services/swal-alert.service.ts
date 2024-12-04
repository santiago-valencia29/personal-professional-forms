import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SwalAlertService {
  public loadRespQuestion = new BehaviorSubject<any>(null)
  public loadRespQuestion$ = this.loadRespQuestion.asObservable()

  public loadRespQuestionAppUpdate = new BehaviorSubject<any>(null)
  public loadRespQuestionAppUpdate$ = this.loadRespQuestionAppUpdate.asObservable()

  variables = {
    infoBackground: '#302cc1',
    successBackground: '#4a9d52',
    warningBackground: '#f2bb1d',
    errorBackground: '#e7452c',
    confirmButtonColor: '#302cc1',
    cancelButtonColor: '#d73d32'
  }

  constructor() {}

  backgroundChangeIcon(icon: string): string {
    switch (icon) {
      case 'info':
        return this.variables.infoBackground
      case 'success':
        return this.variables.successBackground
      case 'error':
        return this.variables.errorBackground
      case 'warning':
        return this.variables.warningBackground
      default:
        return this.variables.infoBackground
    }
  }

  swalAlertClose() {
    Swal.close()
  }

  toast(title: string, message: string, icon: any, timer: number) {
    Swal.fire({
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
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
      showCloseButton: true,
      showConfirmButton: false,
      background: this.backgroundChangeIcon(icon),
      timer: timer
    })
  }

  toastTarget(
    title: string,
    message: string,
    icon: any,
    timer: number,
    target: string,
    position?: any
  ) {
    Swal.fire({
      title: title,
      html: message,
      target: target, //#custom-target: position relative
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
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
      toast: true,
      position: position || 'top-end',
      showCloseButton: true,
      showConfirmButton: false,
      background: this.backgroundChangeIcon(icon),
      timer: timer
    })
  }

  toastErrorService() {
    const message =
      'There was an inconsistency when loading the information. Please try again later or contact support staff.'
    Swal.fire({
      title: 'Error',
      html: `<div style="color:#ffffff; margin:10px">${message}<div>`,
      icon: 'error',
      position: 'top',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: true,
      confirmButtonColor: this.variables.confirmButtonColor,
      confirmButtonText: 'Retry',
      background: this.backgroundChangeIcon('error')
    }).then((result) => {
      if (result.isConfirmed) {
        this.respQuestion(true)
      }
      this.respQuestion(false)
    })
  }

  loading(message: string) {
    Swal.fire({
      showConfirmButton: false,
      // -- TODO: config allowEscapeKey: false,  allowOutsideClick: false
      allowEscapeKey: false,
      allowOutsideClick: false,
      icon: 'info',
      html: `<h6 style="color:#000000">${message}</h6>`,
      position: 'top',
      showClass: {
        popup: 'animate__animated animate__zoomIn animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut animate__faster'
      },
    })
    Swal.showLoading()
  }

  loadingCenter(message: string) {
    Swal.fire({
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: 'info',
      html: `<h6 style="color:#000000">${message}</h6>`,
      position: 'center',
      showClass: {
        popup: 'animate__animated animate__zoomIn animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut animate__faster'
      },
    })
    Swal.showLoading()
  }

  loadingTarget(message: string, target: string) {
    Swal.fire({
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      icon: 'info',
      html: `<h6 style="color:#000000">${message}</h6>`,
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
    Swal.showLoading()
  }

  questionAction(
    title: string,
    message: string,
    icon: any,
    confirmButtonText: string,
    cancelButtonText: string,
    target?: string
  ) {
    Swal.fire({
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
      confirmButtonColor: this.variables.confirmButtonColor,
      cancelButtonColor: this.variables.cancelButtonColor,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        this.respQuestion(true)
      }
      this.respQuestion(false)
    })
  }

  respQuestion(data?: any) {
    if (data == null) {
      return this.loadRespQuestion.getValue()
    }
    this.loadRespQuestion.next(data)
    return this.loadRespQuestion.getValue()
  }

  alertUpdateApp(){
    Swal.fire({
      html: `<h6 style="color:#000000">Update Available</h6>`,
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
      confirmButtonColor: this.variables.confirmButtonColor,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.respQuestionAppUpdate(true)
      }
      this.respQuestionAppUpdate(false)
    })
  }

  respQuestionAppUpdate(data?: any) {
    if (data == null) {
      return this.loadRespQuestionAppUpdate.getValue()
    }
    this.loadRespQuestionAppUpdate.next(data)
    return this.loadRespQuestionAppUpdate.getValue()
  }
}
