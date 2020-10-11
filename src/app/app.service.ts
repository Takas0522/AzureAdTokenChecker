import { Injectable } from '@angular/core';
import { AuthSetting } from './models/auth-settings';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private readonly AUTH_SETTNGS_KEY = 'authSettings';
    private _datas: AuthSetting[] = [];
    get datas(): AuthSetting[] {
        return this._datas;
    }

    constructor() {
        this.loadData();
    }

    loadData(): void {
        const dataSt = localStorage.getItem(this.AUTH_SETTNGS_KEY);
        if (dataSt && dataSt !== '') {
            this._datas = JSON.parse(dataSt);
        }
    }

    saveData(data: AuthSetting): void {
        if (data.index === 0) {
            if (this.datas == null || this.datas.length < 1) {
                data.index = 1;
                this.datas.push(data);
                this.saveLocalStorge();
                return;
            }
            const idexs = this.datas.map(m => m.index);
            const maxIndex = Math.max(...idexs);
            if (maxIndex) {
                data.index = maxIndex + 1;
            }
            this.datas.push(data);
        } else {
            const editData = this.datas.filter(f => f.index === data.index);
            editData[0].clientId = data.clientId;
            editData[0].tenant = data.tenant;
            editData[0].scopes = data.scopes;
        }
        this.saveLocalStorge();
    }

    saveLocalStorge(): void {
        const saveDataSt = JSON.stringify(this.datas);
        localStorage.setItem(this.AUTH_SETTNGS_KEY, saveDataSt);
    }

    deleteData(index: number): void {
        const newArray = this.datas.filter(f => f.index !== index);
        newArray.forEach((f, i) => {
            f.index = i;
        });
        this._datas = newArray;
        this.saveLocalStorge();
    }

}
