import { TemplateRef } from '@angular/core';
import { CommonTableFieldTemplateDirective } from './common-table-field-template.directive';
export type OrNull<Type> = Type | null;
/* 映射用 */
export type PickObj<T, U extends keyof T> = T[U];
/* 實際綁定在html上的資料實體 */
export interface ViewColumnDef<T> extends TableColumnDef<T> {
  fieldDirective: OrNull<CommonTableFieldTemplateDirective<T>>;
}
/* table欄位定義 */
export interface TableColumnDef<T> {
  // 資料鍵值
  dataKey: keyof T;
  // 欄位標題名稱
  headerNames: string;
  // 欄位長度
  widthOfTable: string;
  // 輸入匡長度
  widthOfInput?: string;
  // 欄位內名稱
  fieldName?: string;
  formatFunc?: (data: T) => string;
  fieldTemplate?: TemplateRef<any>;
  // 是否固定最右邊
  dwRight?: boolean;
  // 是否固定最左邊
  dwLeft?: boolean;
  // 是否隱藏key
  hiddenKey?: boolean;
  // 數字輸入匡最大值
  dwMax?: number;
  // 數字輸入框最小值
  dwMin?: number;
}
/* 映射新類型讓model內也能使用到T */
export type TableData<T> = {
  [key in keyof T]: PickObj<T, key>;
};
/* 操作 */
export interface OperateItem<TableData> {
  name: string;
  handleOperate: (data: TableData) => void;
}
/* directive let-data帶入的資料格式 */
export interface TableTemplateRefData<T> {
  /** 模板附帶資料 */
  $implicit: {
    data: any,
    index: number,
    rowData: T,
  };
  /** 標頭資訊 */
  columnDef: TableColumnDef<T>;
}
