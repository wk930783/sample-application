import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSidenavComponent } from './left-sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LeftSidenavComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    LeftSidenavComponent
  ]
})
export class LeftSidenavModule { }
