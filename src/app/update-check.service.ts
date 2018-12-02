import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UpdateCheckService {

  constructor(
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar
  ) {
    this.swUpdate.available.subscribe(e => {
      const snack = this.snackBar.open('Update!', 'Reload');
      snack.onAction().subscribe(() => {
        window.location.reload();
      });
      setTimeout(() => {
        snack.dismiss();
      }, 10000);
    });
  }
}
