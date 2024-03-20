import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ContentChildren,
  QueryList,
  ContentChild,
  ChangeDetectorRef,
  OnChanges,
  AfterContentInit
} from '@angular/core';
import {
  TableColumnDef,
  TableData,
  OperateItem,
  ViewColumnDef,
} from './common-table.model';
import { CommonTableFieldTemplateDirective } from './common-table-field-template.directive';
import * as _ from 'lodash';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
})
export class CommonTableComponent<DataT> implements OnChanges, AfterContentInit {
  @ContentChildren(CommonTableFieldTemplateDirective)
  fieldTemplateDirectives!: QueryList<CommonTableFieldTemplateDirective<DataT>>;

  @ContentChild(CommonTableComponent)
  childTableTemplate!: CommonTableComponent<DataT>;

  /** table 標頭資訊 */
  @Input() tableColumnDefs: TableColumnDef<DataT>[] = [];
  @Input() dataPkKey!: keyof DataT;
  /** table 資料 */
  @Input() tableData: TableData<DataT>[] = []; //表單資料
  @Input() tableHeight = ''; // 表單高度
  @Input() pageSize = 10; // 單頁要顯示的資料數量
  @Input() pageIndex = 0; // 頁數最低為1
  @Input() showLoading = false; //載入loading
  @Input() dataTotalRows = 0; //資料總數
  @Input() tablePageOptions: number[] = [10, 20, 30, 40]; // 数据 分页选择
  @Input() operateItems: OperateItem<TableData<DataT>>[] = []; //操作內容
  @Input() tableType: 'edit' | 'query' = 'query'; // 同常為query模式(無法行內編輯),edit模式需要在columnDef設定needEdit
  @Input() needExpand = false; //是否需要展開功能
  @Input() hasChanged = false; //是否編輯過
  @Input() showTotal = false; // 顯示總數
  @Input() totalField?: keyof DataT; // total的欄位名稱

  @Output() tableDataChange = new EventEmitter<TableData<DataT>[]>(); //列表資料改變,雙向綁定用
  @Output() saveEvent = new EventEmitter<TableData<DataT>[]>(); //儲存按鈕事件
  @Output() pageSizeChange = new EventEmitter<number>(); //列表資料數量改變
  @Output() pageIndexChange = new EventEmitter<number>(); //列表頁數改變
  @Output() pageChange = new EventEmitter<number>(); // 列表頁操作
  @Output() hasChangedChange = new EventEmitter<boolean>(); // 資料是否變動過,是則回傳(檢測資料是否有編輯用)
  @Output() cancel = new EventEmitter<any>(); // 取消編輯事件
  @Input() handleOperate?: () => void;
  @Input() setTableHeight?: () => void;
  @Input() isEdit = false; // 是否開啟編輯狀態
  @Output() isEditChange = new EventEmitter<boolean>(); // 是否開啟編輯狀態雙向綁定用
  @Output() inputDataChange = new EventEmitter<TableData<DataT>[]>(); // 輸入框資料變動事件

  viewData: TableData<DataT>[] = [];
  oldData: TableData<DataT>[] = [];
  viewColumnDefs: ViewColumnDef<DataT>[] = [];
  directiveFieldMap = new Map<
    string | number,
    CommonTableFieldTemplateDirective<DataT>
  >();
  fieldDirective: any;
  totalFieldIndex?: number; // 需要計算total的欄位
  total?: number; // 總數,可自行傳入或前端計算當前頁面總數


  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { tableData, tableColumnDefs } = changes;
    if (tableData && tableData.currentValue) {
      this.viewData = _.cloneDeep(this.tableData);
      // 設定total index
      if(this.showTotal) {
        this.totalFieldIndex = this.viewColumnDefs.findIndex(columnDef => columnDef.dataKey === this.totalField);
        this.setTotal();
      }
    }
    if (tableColumnDefs && tableColumnDefs.currentValue) {
      this.viewColumnDefs = this._createViewTableCoumnDef();
    }
  }

  ngAfterContentInit(): void {
    this.fieldTemplateDirectives?.forEach((directive) => {
      this.directiveFieldMap.set(directive.dataKey, directive);
    });
    this.viewColumnDefs = this._createViewTableCoumnDef();
  }

  // 開始編輯列表資料
  doEdit() {
    this.isEdit = true;
    this.isEditChange.emit(this.isEdit);
  }

  /**點擊取消按鈕事件 */
  doCancelEdit() {
    this.cancelEdit();
  }

  // 取消編輯
  cancelEdit() {
    this.viewData = _.cloneDeep(this.tableData);
    this.hasChanged = false;
    this.isEdit = false;
    this.hasChangedChange.emit(this.hasChanged);
    this.isEditChange.emit(this.isEdit);
    this.cancel.emit();
  }

    // 儲存編輯
    saveEditDlg() {
      this.saveEdit();
    }

  dataChange(){
    this.oldData = _.cloneDeep(this.tableData);
    this.tableData = _.cloneDeep(this.viewData);
    this.tableDataChange.emit(this.tableData);
  }

  // 儲存編輯
  saveEdit(){
    this.oldData = _.cloneDeep(this.tableData);
    this.tableData = _.cloneDeep(this.viewData);
    this.isEdit = false;
    this.isEditChange.emit(this.isEdit);
    this.changeDetectorRef.detectChanges();
    this.tableDataChange.emit(this.tableData);
    this.saveEvent.emit(this.oldData);
  }

  private _createViewTableCoumnDef(): ViewColumnDef<DataT>[] {
    return this.tableColumnDefs.map((columnDef: TableColumnDef<DataT>) => {
      const cloneDef: TableColumnDef<DataT> = _.cloneDeep(columnDef);
      const viewDef: ViewColumnDef<DataT> = {
        ...cloneDef,
        fieldDirective: this.directiveFieldMap.get(columnDef.dataKey as string) ?? null,
      };
      return viewDef;
    });
  }

  trackByFn(index: number, data: DataT): string {
    return String(data[this.dataPkKey]) ?? index; // 假設每個項目都有一個唯一的 id 屬性
  }
  trackByFnIndex(index: number) {
    return index;
  }

  // 列表 数据表格页码变化
  tableHandle(event: any, type: string, oldValue: number): any {
    if (this.hasChanged) {
      this.pageChangeDlg(event);
    } else {
      this.pageChangeEvent(event);
    }
  }

  /**變更頁數 單頁總數 開窗 */
  pageChangeDlg(event: PageEvent) {
  }

  /**頁數 單頁總數 變更事件 */
  pageChangeEvent(event: PageEvent, sendEvent=true) {
    if(this.pageSize !== event.pageSize) {
      this.pageSize = event.pageSize;
      this.pageSizeChange.emit(this.pageSize);
    }
    if(this.pageIndex !== event.pageIndex){
      this.pageIndex = event.pageIndex;
      this.pageIndexChange.emit(this.pageIndex);
    }
    if(this.showTotal) {
      this.setTotal();
    }
    if(sendEvent){
      this.pageChange.emit();
    }
  }

  numberValueChange(data: DataT, dataKey: keyof DataT){
    if( data[dataKey] as number < 0){
      (data[dataKey] as number) = 0;
    }else if( data[dataKey] as number > 100){
      (data[dataKey] as number) = 100;
    }
    console.log(data[dataKey]);
    this.valueChange();
  }

  valueChange() {
    this.hasChanged = true;
    this.hasChangedChange.emit(this.hasChanged);
    this.inputDataChange.emit(this.viewData);
  }

  /** 設定總數 */
  setTotal() {
    if(this.viewData.length) {
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = (this.pageIndex + 1) * this.pageSize > this.viewData.length ? this.viewData.length : (this.pageIndex + 1) * this.pageSize;
      console.log(startIndex, endIndex)
      const numbers = this.viewData.slice(startIndex, endIndex).map(data => Number(data[this.totalField!]));
      if(numbers.length === 0  && this.pageIndex > 0){
        // 如果numbers為undefined 且 頁籤在第一頁以後
        this.pageChangeEvent({
          pageIndex: this.pageIndex - 1,
          pageSize: this.pageSize,
          length: this.viewData.length
        });
      } else if (numbers.length === 0 && this.pageIndex === 0) {
        // 如果numbers為undefined 且 頁籤在第一頁
        this.total = 0;
      } else {
        // 如果numbers正常有值
        this.total = numbers.reduce((a,b) => a + b);
      }
    } else {
      this.total = 0;
    }
  }
}
