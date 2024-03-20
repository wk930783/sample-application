import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import * as _ from 'lodash';
import { Menu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-left-sidenav',
  templateUrl: './left-sidenav.component.html',
  styleUrls: ['./left-sidenav.component.scss']
})
export class LeftSidenavComponent implements OnInit {
  menuList: Menu[] = [];
  nowMenuCode = '';
  constructor(
    private menuService: MenuService,
  ) {
  }
  ngOnInit(){
    this.nowMenuCode = this.menuService.nowMenuCode;
    this.menuService.getMenu().subscribe({
      next: (menuList) => {
        this.menuList = _.cloneDeep(menuList);
      }
    });
  }

  changeNowMenuCode(menuCode: string){
    this.nowMenuCode = menuCode;
  }
}
