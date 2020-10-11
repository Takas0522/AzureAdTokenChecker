import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MsalService as MsalService } from './services/msal.service';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { AuthSetting } from './models/auth-settings';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private matDialog: MatDialog,
    private service: AppService
  ) {}

  get settings(): AuthSetting[] {
    return this.service.datas;
  }

  ngOnInit(): void {}

  addSetting(): void {
    const ref = this.matDialog.open(ClientRegisterComponent, { width: '30vw' });
    ref.afterClosed().subscribe(res => {
      if (typeof(res) !== 'undefined' && res.action === 'register') {
        this.service.saveData(res.value);
      }
    });
  }

  editSetting(index: number): void {
    const editData = this.settings.filter(f => f.index === index)[0];
    const ref = this.matDialog.open(ClientRegisterComponent, { data: editData, width: '30vw' });
    ref.afterClosed().subscribe(res => {
      if (typeof(res) !== 'undefined' && res.action === 'register') {
        this.service.saveData(res.value);
        return;
      }
      if (typeof(res) !== 'undefined' && res.action === 'delete') {
        this.service.deleteData(index);
        return;
      }
    });
  }
}
