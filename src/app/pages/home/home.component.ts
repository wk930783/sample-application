import { Component } from '@angular/core';
import { OperateItem, TableColumnDef } from 'src/app/common-components/common-table/common-table.model';
import { EditPersonParams, GetPersonListParams, Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash'
import { PersonDialogComponent } from './pages/person-listing/components/person-dialog/person-dialog.component';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  personList: Person[] = [];
  tableColumnDefs!: TableColumnDef<Person>[];
  operateItems: OperateItem<Person>[] = [];
  queryParams: GetPersonListParams = {
    name: '',
    country: '',
    salary: null,
    email: '',
    id: ''
  }
  queryParamsForm: GetPersonListParams = {
    name: '',
  }
  selectPerson?: Person;
  formType!: 'Edit' | 'Create';
  visibleUserForm = false;
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
    public dialog: MatDialog
  ) {

  }
  ngOnInit(): void {
    this.setTableCoulumnDefs();
    this.setOperateItems();
    this.getPersonList();
  }
  /** 獲取人員資料 */
  getPersonList(): void {
    this.personService.getPersonList(this.queryParams).subscribe({
      next: (personList) => {
        this.personList = personList;
      }
    })
  }
  /** 新增人員 */
  createPerson(person: Person){
    const subscripiton = this.personService.createPerson(person).subscribe({
      next:(success) =>{
        if(success){
          this.closeUserForm();
          this.getPersonList();
        }
      },
      complete: ()=>{
        subscripiton.unsubscribe();
      }
    });
  }
  /** 編輯人員資料 */
  editPerson(person: Person){
    const params: EditPersonParams = {
      id: person.id!,
      name: person.name,
      country: person.country,
      salary: person.salary,
      email: person.email
    }
    const subscripiton = this.personService.editPerson(params).subscribe({
      next:(success) =>{
        if(success){
          this.closeUserForm();
          this.getPersonList();
        }
      },
      complete: ()=>{
        subscripiton.unsubscribe();
      }
    });
  }
  /** 刪除人員資料 */
  deleteUser(id: string) {
    this.personService.deletePerson(id).subscribe({
      next: (success) => {
        if(success) {
          if(this.selectPerson && this.selectPerson.id === id) {
            this.closeUserForm();
          }
          this.getPersonList();
        }
      }
    });
  }
  /** 設定響應式表單 */
  setFormGroup(user: Person) {
    this.formGroup = new FormGroup({
      name: new FormControl(user.name, Validators.required),
      country: new FormControl(user.country, Validators.required),
      salary: new FormControl(user.salary, [Validators.required]),
      email: new FormControl(user.email, [Validators.required, Validators.email, this.wordValidator('email')])
    });
  }
  /** table欄位定義 */
  setTableCoulumnDefs(): void {
    this.tableColumnDefs = [
      {
        dataKey: 'name',
        headerNames: 'Name',
        widthOfTable: '80px'
      },
      {
        dataKey: 'country',
        headerNames: 'Country',
        widthOfTable: '80px'
      },
      {
        dataKey: 'salary',
        headerNames: 'Salary',
        widthOfTable: '80px'
      },
      {
        dataKey: 'email',
        headerNames: 'Email',
        widthOfTable: '200px'
      }
    ];
  }
  /** 設定table操作 */
  setOperateItems(): void {
    this.operateItems = [
      {
        name: 'Edit',
        handleOperate: (data: Person) => {
          this.editUserForm(data);
        }
      },
      {
        name: 'Delete',
        handleOperate: (data: Person) => {
          this.deleteUser(data.id!);
        }
      }
    ]
  }

  /** 開啟人員表單 */
  openUserForm() {
    this.visibleUserForm = true;
  }
  /** 關閉人員表單 */
  closeUserForm() {
    this.visibleUserForm = false;
    this.formGroup.reset();
  }
  submitForm(person: Person, type: 'Edit' | 'Create') {
    console.log(type,person);
    if(type === 'Edit') {
      person.id = this.selectPerson!.id;
      this.editPerson(person);
    } else {
      this.createPerson(person);
    }
  }
  /** 新增人員表單 */
  createUserForm() {
    const person: Person = {
      name: '',
      country: '',
      salary: 0,
      email: ''
    };
    this.selectPerson = undefined;
    this.formType = 'Create';
    this.setFormGroup(person)
    this.openUserForm();
  }
  /** 編輯人員開窗 */
  editUserForm(person: Person) {
    this.formType = 'Edit';
    this.selectPerson = _.cloneDeep(person);
    this.setFormGroup(person);
    this.openUserForm();
  }
  /** 進階查詢 */
  advancedSearch() {
    this.queryParams.name = this.queryParamsForm.name;
    this.getPersonList();
  }
  /** 自定義驗證 有無重複值 */
  wordValidator(field: keyof Person): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputValue: any = control.value;
      const personList = this.selectPerson ? this.personList.filter(p => p.id !== this.selectPerson!.id) : _.cloneDeep(this.personList);
      const isDuplicate: boolean = personList.map(p => p[field]).includes(inputValue);

      if (isDuplicate) {
        return { uniqueValue: true }; // 自訂錯誤名稱為 uniqueValue
      } else {
        return null; // 驗證通過
      }
    };
  }
}
