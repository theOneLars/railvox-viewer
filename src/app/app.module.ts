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

@NgModule({
  declarations: [
    AppComponent,
    RailvoxParserComponent,
    TagesleistungViewComponent,
    ZugViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
