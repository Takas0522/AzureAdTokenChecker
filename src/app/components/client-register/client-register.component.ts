import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthSetting, IAuthSetting, Scope } from 'src/app/models/auth-settings';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss']
})
export class ClientRegisterComponent implements OnInit {

  formGroup!: FormGroup;
  isNewData = true;

  get scopes(): FormArray {
    return this.formGroup.get('scopes') as FormArray;
  }

  constructor(
    private dialogRef: MatDialogRef<ClientRegisterComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    private data?: AuthSetting | undefined,
  ) {
  }

  ngOnInit(): void {
    this.isNewData = (typeof(this.data) === 'undefined' || this.data == null);
    const tenant = this.isNewData ? '' : this.data.tenant;
    const clientId = this.isNewData ? '' : this.data.clientId;
    const scopes = this.genFormArray(this.data);

    this.formGroup = this.formBuilder.group({
      tenant: [tenant, Validators.required],
      clientId: [clientId, Validators.required],
      scopes: this.formBuilder.array(scopes)
    });
  }

  addScopes(): void {
    const addGroups = this.formBuilder.group({
      scope: ['', Validators.required]
    });
    this.scopes.push(addGroups);
  }

  removeGroups(index: number): void {
    this.scopes.removeAt(index);
  }

  register(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const retValue: IAuthSetting = {
      index: this.isNewData ? 0 : this.data.index,
      clientId: this.formGroup.value.clientId,
      scopes: this.formGroup.value.scopes,
      tenant: this.formGroup.value.tenant
    };
    this.dialogRef.close({ action: 'register', value: retValue});
  }

  delete(): void {
    this.dialogRef.close({ action: 'delete'});
  }

  private genFormArray(data: AuthSetting | undefined): FormGroup[] {
    if (this.isNewData) {
      return [];
    }
    return this.data.scopes.map(f => this.formBuilder.group(f));
  }

}
