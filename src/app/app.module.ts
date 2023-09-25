import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './shared/layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { AdolescentListComponent } from './adolescent-list/adolescent-list.component';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: 'adolescent-list', component: AdolescentListComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    AdolescentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
