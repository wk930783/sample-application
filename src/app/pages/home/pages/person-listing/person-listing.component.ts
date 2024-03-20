import { Component } from '@angular/core';
import { OperateItem, TableColumnDef } from 'src/app/common-components/common-table/common-table.model';
import { EditPersonParams, GetPersonListParams, Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';
import { PersonDialogComponent } from './components/person-dialog/person-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash'
@Component({
  selector: 'app-person-listing',
  templateUrl: './person-listing.component.html',
  styleUrls: ['./person-listing.component.scss']
})
export class PersonListingComponent {
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
          this.getPersonList();
        }
      },
      complete: ()=>{
        subscripiton.unsubscribe();
      }
    });
  }
  /** 刪除人員資料 */
  deletePerson(id: string) {
    this.personService.deletePerson(id).subscribe({
      next: (success) => {
        if(success) {
          this.getPersonList();
        }
      }
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
          this.editPersonDlg(data);
        }
      },
      {
        name: 'Delete',
        handleOperate: (data: Person) => {
          this.deletePerson(data.id!);
        }
      }
    ]
  }

  /** 開窗 */
  openPersonDlg(person: Person, type: 'create' | 'edit'): MatDialogRef<PersonDialogComponent, any> {
    return this.dialog.open(PersonDialogComponent, {
      data: person
    });
  }
  /** 新增人員開窗 */
  createMemberDlg() {
    const person: Person = {
      name: '',
      country: '',
      salary: 0,
      email: ''
    };
    const dlg = this.openPersonDlg(person,'create');
    const subscription = dlg.afterClosed().subscribe({
      next: (person) => {
        if(person){
          this.createPerson(person);
        }
      },
      complete: () => {
        subscription.unsubscribe();
      }
    });
  }
  /** 編輯人員開窗 */
  editPersonDlg(person: Person) {
    const dlg = this.openPersonDlg(_.cloneDeep(person),'edit');
    const subscription = dlg.afterClosed().subscribe({
      next: (person: Person) => {
        if(person){
          this.editPerson(person);
        }
      },
      complete: () => {
        subscription.unsubscribe();
      }
    });
  }
  /** 進階查詢 */
  advancedSearch() {
    this.queryParams.name = this.queryParamsForm.name;
    this.getPersonList();
  }
}
