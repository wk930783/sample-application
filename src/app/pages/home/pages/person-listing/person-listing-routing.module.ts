import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListingComponent } from './person-listing.component';

const routes: Routes = [
  {
    path: '',
    component: PersonListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonListingRoutingModule { }
