import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountInfo } from '@azure/msal-browser';
import { AppService } from 'src/app/app.service';
import { AuthSetting, IAuthSetting } from 'src/app/models/auth-settings';
import { MsalService } from 'src/app/services/msal.service';
import { ClientRegisterComponent } from '../client-register/client-register.component';

@Component({
  selector: 'app-auth-setting-card',
  templateUrl: './auth-setting-card.component.html',
  styleUrls: ['./auth-setting-card.component.scss'],
  providers: [ MsalService ]
})
export class AuthSettingCardComponent implements OnInit {

  @Input()
  data: AuthSetting;
  account: AccountInfo | null = null;
  accessToken = '';
  selectScopes = '';

  constructor(
    private appService: AppService,
    private matDialog: MatDialog,
    private msalService: MsalService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const config = this.data.generateMsalSettings();
    this.msalService.clinetInit(config);
  }

  get scopes(): string {
    return  this.data.scopes.map(m => m.scope).join(',');
  }

  editSetting(): void {
    const editData = this.data;
    const ref = this.matDialog.open(ClientRegisterComponent, { data: editData, width: '30vw' });
    ref.afterClosed().subscribe(res => {
      if (typeof(res) !== 'undefined' && res.action === 'register') {
        this.appService.saveData(res.value);
        return;
      }
      if (typeof(res) !== 'undefined' && res.action === 'delete') {
        this.appService.deleteData(this.data.index);
        return;
      }
    });
  }

  async login(): Promise<void> {
    const scopes: string[] = this.data.scopes.map(s => s.scope);
    const res = await this.msalService.loginPopup(scopes);
    this.account = res.account;
  }

  async acquireToken(): Promise<void> {
    const res = await this.msalService.acquireToken([this.selectScopes]);
    this.accessToken = res.accessToken;
  }

  copyData(): void {
    navigator.clipboard.writeText(this.accessToken);
    this.matSnackBar.open('AccessToken Copy', 'Close', {
      duration: 2000
    });
  }
}
