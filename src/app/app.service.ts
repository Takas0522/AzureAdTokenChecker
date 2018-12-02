import { Injectable } from '@angular/core';
import { IApplicationData } from './i-application-data';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _applicationDatas: IApplicationData[] = [];
  get applciationDatas() {
    return this._applicationDatas;
  }

  private readonly storgaeName = 'applicationdatas';

  applicationInit() {
    const datasSt: string = localStorage[this.storgaeName];
    if (datasSt) {
      this._applicationDatas = JSON.parse(datasSt);
    }
  }

  setApplicationData(data: IApplicationData) {
    this._applicationDatas.push(data);
    this.updateApplicationData();
  }

  updateApplicationData() {
    const datasSt = JSON.stringify(this._applicationDatas);
    localStorage[this.storgaeName] = datasSt;
  }
}
