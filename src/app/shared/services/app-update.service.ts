import { Injectable, Inject, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SwalAlertService } from './swal-alert.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService implements OnInit {

  constructor(
    private updates: SwUpdate,
    public _swalAlertService: SwalAlertService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    // Subscribe to versionUpdates to handle the update logic
    this.updates.versionUpdates.subscribe(event => {
      if (event.type === 'VERSION_READY') {
        this.showAppUpdateAlert();
      }
    });
  }

  showAppUpdateAlert() {
    this._swalAlertService.alertUpdateApp();

    // Listen for user response to the alert
    this._swalAlertService.loadRespQuestionAppUpdate$.subscribe((data) => {
      if (data) {
        this.doAppUpdate();
      }
    });
  }

  doAppUpdate() {
    this.updates.activateUpdate().then(() => {
      this.document.location.reload();
    }).catch(err => {
      console.error('Failed to activate update:', err);
    });
  }
}
