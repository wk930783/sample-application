import { Injectable } from '@angular/core';
import { from, Observable, tap } from 'rxjs';
import { CreatePersonParams, EditPersonParams, GetPersonListParams, Person } from '../models/person.model';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class PersonService {
  mockPersonList: Person[] = [
    {
      name: 'Baha',
      country: 'Sacrum Romanum Imperium',
      salary: 3,
      email: 'baha@xxx.xxx',
      id: ' user000001'
    },
    {
      name: 'Voltaire',
      country: 'France',
      salary: 3,
      email: 'voltaire@xxx.xxx',
      id: ' user000002'
    },
    {
      name: 'Plato',
      country: 'Greece',
      salary: 1,
      email: 'plato@xxx.xxx',
      id: ' user000003'
    }
  ]
  constructor(
  ) { }
  /** 獲取全部人員 */
  getPersonList(params: GetPersonListParams): Observable<Person[]> {
    return from(new Promise<Person[]>((resolve,reject)=>{
      let result: Person[] = _.clone(this.mockPersonList);
      if(params.id) {
        result = result.find(p => p.id === params.id) ? [this.mockPersonList.find(p => p.id === params.id)!] : [];
      }
      if(params.email) {
        result = result.filter(r => r.email.toLowerCase().includes(params.email!.toLowerCase()));
      }
      if(params.name) {
        result = result.filter(r => r.name.toLowerCase().includes(params.name!.toLowerCase()));
      }
      if(params.country) {
        result = result.filter(r => r.country.toLowerCase().includes(params.country!.toLowerCase()));
      }
      if(params.salary) {
        result = result.filter(r => (r.salary + '').includes(params.salary! + ''));
      }
      resolve(result);
    }));
  }
  /** 新增人員 */
  createPerson(params: CreatePersonParams): Observable<boolean> {
    let person: Person = {
      id: '',
      name: params.name,
      country: params.country,
      salary: params.salary,
      email: params.email
    }
    let id = Math.random().toString(36).substring(2, 18);
    const ids = this.mockPersonList.map(p => p.id);
    while(ids.includes(id)) {
      id = Math.random().toString(36).substring(2, 18);
    }
    person.id = id;
    this.mockPersonList.splice(0, 0, person);
    return from(new Promise<boolean>((resolve,reject)=>{
      resolve(true);
    }));
  }
  /** 編輯人員 */
  editPerson(params: EditPersonParams): Observable<boolean> {
    const person = this.mockPersonList.find(p => p.id === params.id);
    if(person) {
      person.name = params.name;
      person.email = params.email;
      person.salary = params.salary;
      person.country = params.country;
    }
    return from(new Promise<boolean>((resolve,reject)=>{
      resolve(true);
    }));
  }
  /** 刪除人員 */
  deletePerson(id: string): Observable<boolean> {
    return from(new Promise<boolean>((resolve,reject)=>{
      resolve(true);
    })).pipe(
      tap(()=>{
        const index = this.mockPersonList.findIndex(person => person.id === id);
        this.mockPersonList.splice(index, 1);
      })
    );
  }
}
