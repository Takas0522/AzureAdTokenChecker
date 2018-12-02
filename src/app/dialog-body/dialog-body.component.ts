import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { IApplicationData } from '../i-application-data';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent {

  formData: IApplicationData = { applicationName: '', clientId: '', tenantName: '' };
  dialogForm: FormGroup = new FormGroup({
    'applicationName': new FormControl(this.formData.applicationName, [
      Validators.required
    ]),
    'clientId': new FormControl(this.formData.clientId, [
      Validators.required
    ]),
    'tenantName': new FormControl(this.formData.tenantName, [
      Validators.required
    ])
  });

  constructor(
    private dialogRef: MatDialogRef<DialogBodyComponent>
  ) { }

}
