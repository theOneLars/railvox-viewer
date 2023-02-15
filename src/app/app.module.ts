import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RailvoxParserComponent} from './business/railvox-parser/railvox-parser.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatCardModule} from '@angular/material/card';
import {TagesleistungViewComponent} from './view/trains/tagesleistung-view/tagesleistung-view.component';
import {ZugViewComponent} from './view/trains/zug-view/zug-view.component';
import {PassageViewComponent} from './view/trains/passage-view/passage-view.component';
import {TriggerViewComponent} from './view/trains/trigger-view/trigger-view.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MeldungViewComponent} from './view/trains/meldung-view/meldung-view.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FileDropComponent} from './component/file-drop/file-drop.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import { OperatingPeriodViewComponent } from './view/operating-periods/operating-period-view/operating-period-view.component';
import {MatSelectModule} from "@angular/material/select";
import { CalendarViewComponent } from './view/operating-periods/calendar-view/calendar-view.component';

@NgModule({
  declarations: [
    AppComponent,
    RailvoxParserComponent,
    TagesleistungViewComponent,
    ZugViewComponent,
    PassageViewComponent,
    TriggerViewComponent,
    MeldungViewComponent,
    FileDropComponent,
    OperatingPeriodViewComponent,
    CalendarViewComponent,
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
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  providers: [
    HttpClient,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 6000}},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {provide: MAT_DATE_LOCALE, useValue: 'de-CH'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
