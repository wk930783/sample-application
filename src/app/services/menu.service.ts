import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { from, map, Observable } from 'rxjs';
import { Menu } from '../models/menu.model';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  mockMenuList: Menu[] = [
    {
      link: '/person-listing',
      name: '人員列表',
      code: 'p001'
    }
  ];
  nowMenuCode = '';
  constructor(){

  }
  /** 獲取Menu清單(Promise 只是為了模擬API事件,之後請替換掉) */
  getMenu(): Observable<Menu[]>{
    const menuList: Menu[] = [];
    return from(new Promise<Menu[]>((resolve, reject) => {
      resolve(_.cloneDeep(this.mockMenuList));
    }));
  }

}
