import { Injectable } from '@angular/core';
import { from, Observable, tap } from 'rxjs';
import { CreateUserParams, EditUserParams, GetUserListParams, User } from '../models/user.model';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  mockUserList: User[] = [
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
  getUserList(params: GetUserListParams): Observable<User[]> {
    return from(new Promise<User[]>((resolve,reject)=>{
      let result: User[] = _.clone(this.mockUserList);
      if(params.id) {
        result = result.find(p => p.id === params.id) ? [this.mockUserList.find(p => p.id === params.id)!] : [];
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
  createUser(params: CreateUserParams): Observable<boolean> {
    let user: User = {
      id: '',
      name: params.name,
      country: params.country,
      salary: params.salary,
      email: params.email
    }
    let id = Math.random().toString(36).substring(2, 18);
    const ids = this.mockUserList.map(p => p.id);
    while(ids.includes(id)) {
      id = Math.random().toString(36).substring(2, 18);
    }
    user.id = id;
    this.mockUserList.splice(0, 0, user);
    return from(new Promise<boolean>((resolve,reject)=>{
      resolve(true);
    }));
  }
  /** 編輯人員 */
  editUser(params: EditUserParams): Observable<boolean> {
    const user = this.mockUserList.find(p => p.id === params.id);
    if(user) {
      user.name = params.name;
      user.email = params.email;
      user.salary = params.salary;
      user.country = params.country;
    }
    return from(new Promise<boolean>((resolve,reject)=>{
      resolve(true);
    }));
  }
  /** 刪除人員 */
  deleteUser(id: string): Observable<boolean> {
    return from(new Promise<boolean>((resolve,reject)=>{
      resolve(true);
    })).pipe(
      tap(()=>{
        const index = this.mockUserList.findIndex(user => user.id === id);
        this.mockUserList.splice(index, 1);
      })
    );
  }
}
