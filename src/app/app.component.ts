import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MsalService as MsalService } from './services/msal.service';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { AuthSetting } from './models/auth-settings';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private matDialog: MatDialog,
    private service: AppService,
    private cd: ChangeDetectorRef
  ) {}

  settings: AuthSetting[] = [];

  ngOnInit(): void {
    this.service.datas.subscribe(s => {
      this.settings = s.map(m => {
        return new AuthSetting(m);
      });
      this.cd.detectChanges();
    });
  }

  addSetting(): void {
    const ref = this.matDialog.open(ClientRegisterComponent, { width: '30vw' });
    ref.afterClosed().subscribe(res => {
      if (typeof(res) !== 'undefined' && res.action === 'register') {
        this.service.saveData(res.value);
      }
    });
  }
}
