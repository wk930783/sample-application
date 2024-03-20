import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonListingRoutingModule } from './person-listing-routing.module';
import { PersonListingComponent } from './person-listing.component';
import { CommonTableModule } from 'src/app/common-components/common-table/common-table.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PersonDialogComponent } from './components/person-dialog/person-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PersonListingComponent,
    PersonDialogComponent
  ],
  imports: [
    CommonModule,
    PersonListingRoutingModule,
    CommonTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class PersonListingModule { }
