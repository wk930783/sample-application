import { TemplateRef } from '@angular/core';
import { CommonTableFieldTemplateDirective } from './common-table-field-template.directive';
export type OrNull<Type> = Type | null;
export type PickObj<T, U extends keyof T> = T[U];
export type InputType = 'text' | 'number' | 'textarea';
export interface ViewColumnDef<T> extends TableColumnDef<T> {
  fieldDirective: OrNull<CommonTableFieldTemplateDirective<T>>;
}
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
  // 欄位是否開放編輯
  needEdit?: boolean;
  fieldTemplate?: TemplateRef<any>;
  // 是否固定最右邊
  dwRight?: boolean;
  // 是否固定最左邊
  dwLeft?: boolean;
  // 是否隱藏key
  hiddenKey?: boolean;
  // 輸入匡類型
  inputType?: InputType;
  // 數字輸入匡最大值
  dwMax?: number;
  // 數字輸入框最小值
  dwMin?: number;
}

export type TableData<T> = {
  [key in keyof T]: PickObj<T, key>;
};

export interface QueryParams {
  pageSize: number;
  pageNum: number;
}

export interface OperateItem<TableData> {
  name: string;
  handleOperate: (data: TableData) => void;
}

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
