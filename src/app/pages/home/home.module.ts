import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TopBarModule } from 'src/app/common-components/top-bar/top-bar.module';
import { FooterModule } from 'src/app/common-components/footer/footer.module';
import { LeftSidenavModule } from 'src/app/common-components/left-sidenav/left-sidenav.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TopBarModule,
    FooterModule,
    LeftSidenavModule,
  ]
})
export class HomeModule { }
