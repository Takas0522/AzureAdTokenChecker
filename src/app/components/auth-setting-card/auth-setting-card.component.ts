import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { AuthSetting, IAuthSetting } from 'src/app/models/auth-settings';
import { ClientRegisterComponent } from '../client-register/client-register.component';

@Component({
  selector: 'app-auth-setting-card',
  templateUrl: './auth-setting-card.component.html',
  styleUrls: ['./auth-setting-card.component.scss']
})
export class AuthSettingCardComponent implements OnInit {

  @Input()
  data: AuthSetting;

  constructor(
    private appService: AppService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
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
}
