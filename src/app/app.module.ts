import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RailvoxParserComponent } from './business/railvox-parser/railvox-parser.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatCardModule} from '@angular/material/card';
import { TagesleistungViewComponent } from './view/tagesleistung-view/tagesleistung-view.component';
import { ZugViewComponent } from './view/zug-view/zug-view.component';
import { PassageViewComponent } from './view/passage-view/passage-view.component';
import { TriggerViewComponent } from './view/trigger-view/trigger-view.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    RailvoxParserComponent,
    TagesleistungViewComponent,
    ZugViewComponent,
    PassageViewComponent,
    TriggerViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  providers: [HttpClient, {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
