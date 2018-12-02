import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IApplicationData } from '../i-application-data';
import { AdalService } from 'adal-angular4';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-expansion-panel-body',
  templateUrl: './expansion-panel-body.component.html',
  styleUrls: ['./expansion-panel-body.component.scss'],
  providers: [
    AdalService
  ]
})
export class ExpansionPanelBodyComponent implements OnInit {

  private acquireGetToken: string | null = '';

  constructor(
    private adalService: AdalService,
    private snackBar: MatSnackBar
  ) {}

  @Input()
  application: IApplicationData = {
    applicationName: '',
    clientId: '',
    tenantName: ''
  };

  @Output()
  update = new EventEmitter();

  get applicationTokenInfo() {
    if (this.acquireGetToken) {
      return this.acquireGetToken;
    }
    if (this.adalService.userInfo) {
      return this.adalService.userInfo.token;
    } else {
      return 'Auth Failed';
    }

  }
  get isAuthenticated() {
    return this.adalService.userInfo.authenticated;
  }

  ngOnInit() {
    this.acquireGetToken = '';
    this.adalService.init({
      tenant: this.application.tenantName,
      clientId: this.application.clientId
    });
    this.adalService.handleWindowCallback();
  }

  getToken() {
    this.acquireGetToken = '';
    if (this.adalService.userInfo.authenticated) {
      this.adalService.acquireToken(this.application.clientId).subscribe(x => {
        this.acquireGetToken = x;
      });
    } else {
      this.adalService.login();
    }
  }

  copyToken() {
    if (typeof navigator.clipboard !== 'undefined') {
      navigator.clipboard.writeText(this.applicationTokenInfo).then(() => {
        const snack = this.snackBar.open('Token Copy!', 'OK');
        setTimeout(() => {
          snack.dismiss();
        }, 10000);
      });
    } else {
      const snack = this.snackBar.open('Your Browser is Not Supported ClipBoard API', 'OK');
      setTimeout(() => {
        snack.dismiss();
      }, 10000);
    }
  }

  updateApplicationInfo() {
    this.update.emit('');
  }

}
