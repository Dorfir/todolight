import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { MomentModule } from 'ngx-moment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MymaterialModule } from './modules/mymaterial/mymaterial.module'

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentModule,
    BrowserAnimationsModule,
    MymaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
