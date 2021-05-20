import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthSetting } from './models/auth-settings';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    // eslint-disable-next-line @typescript-eslint/naming-convention
    private readonly AUTH_SETTNGS_KEY = 'authSettings';

    private _datas: BehaviorSubject<AuthSetting[]> = new BehaviorSubject<AuthSetting[]>([]);
    get datas(): Observable<AuthSetting[]> {
        return this._datas.asObservable();
    }

    constructor() {
        this.loadData();
    }

    loadData(): void {
        const dataSt = localStorage.getItem(this.AUTH_SETTNGS_KEY);
        if (dataSt && dataSt !== '') {
            this._datas.next(JSON.parse(dataSt));
        }
    }

    saveData(data: AuthSetting): void {
        if (data.index === 0) {
            if (this._datas.value == null || this._datas.value.length < 1) {
                data.index = 1;
                const nowValue = this._datas.value;
                nowValue.push(data);
                this._datas.next(nowValue);
                this.saveLocalStorge();
                return;
            }
            const idexs = this._datas.value.map(m => m.index);
            const maxIndex = Math.max(...idexs);
            if (maxIndex) {
                data.index = maxIndex + 1;
            }
            const nowVal = this._datas.value;
            nowVal.push(data);
            this._datas.next(nowVal);
        } else {
            const editDatas = this._datas.value;
            const editData = editDatas.filter(f => f.index === data.index);
            editData[0].clientId = data.clientId;
            editData[0].tenant = data.tenant;
            editData[0].scopes = data.scopes;
            this._datas.next(editDatas);
        }
        this.saveLocalStorge();
    }

    saveLocalStorge(): void {
        const saveDataSt = JSON.stringify(this._datas.value);
        localStorage.setItem(this.AUTH_SETTNGS_KEY, saveDataSt);
    }

    deleteData(index: number): void {
        const newArray = this._datas.value.filter(f => f.index !== index);
        newArray.forEach((f, i) => {
            f.index = i;
        });
        this._datas.next(newArray);
        this.saveLocalStorge();
    }

}
