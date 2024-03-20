import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';

import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as _ from 'lodash';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.scss']
})
export class PersonDialogComponent {
  formGroup!: FormGroup;
  get name(): FormControl {
    return this.formGroup.controls['name'] as FormControl;
  }
  get country(): FormControl {
    return this.formGroup.controls['country'] as FormControl;
  }
  get salary(): FormControl {
    return this.formGroup.controls['salary'] as FormControl;
  }
  get email(): FormControl {
    return this.formGroup.controls['email'] as FormControl;
  }
  constructor(
    private personService: PersonService,
    public dialogRef: MatDialogRef<PersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person,
  ) {}
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(this.data.name, Validators.required),
      country: new FormControl(this.data.country, Validators.required),
      salary: new FormControl(this.data.salary, Validators.required),
      email: new FormControl(this.data.email, [Validators.required, Validators.email])
    });
  }
  onSubmit() {
    const result: Person = this.formGroup.getRawValue();
    if(this.data.id) {
      result.id = this.data.id;
    }
    this.dialogRef.close(result);

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
