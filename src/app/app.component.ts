import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private service: AppService
  ) {}

  get applciationDatas() {
    return this.service.applciationDatas;
  }

  ngOnInit() {
    this.service.applicationInit();
  }

  dataAdd() {
    const dialog = this.dialog.open(DialogBodyComponent, {
      width: '80%'
    });
    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.service.setApplicationData(res);
      }
    });
  }

  updateApplicationInfo() {
    this.service.updateApplicationData();
  }
}
