import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule,],
  exports: [RouterModule],
  providers: [HttpClient],
})
export class AppRoutingModule { }
