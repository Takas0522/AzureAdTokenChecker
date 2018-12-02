import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MaterialSummaryModule } from './material-summary/material-summary.module';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpansionPanelBodyComponent } from './expansion-panel-body/expansion-panel-body.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogBodyComponent,
    ExpansionPanelBodyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialSummaryModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    DialogBodyComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
