import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  baseHeader = {
    Connection: 'keep-alive',
  };
  constructor(private httpClient: HttpClient){

  }
  /** 查詢非敏感資料 */
  get<T>(url: string, header?: any): Observable<T>{
    const apiHeader = {...this.baseHeader,...header};
    return this.httpClient.get<T>(url, {headers: apiHeader});
  }
  /** 新增或查詢 資料 */
  post<T>(url: string, body: any, header?: any): Observable<T>{
    const apiHeader = {...this.baseHeader,...header};
    return this.httpClient.post<T>(url, body,{headers: apiHeader});
  }
  /** 更新資料 */
  put<T>(url: string, body: any, header?: any): Observable<T>{
    const apiHeader = {...this.baseHeader,...header};
    return this.httpClient.put<T>(url, body,{headers: apiHeader});
  }
  /** 刪除資料 */
  delete<T>(url: string, body: any, header?: any): Observable<T>{
    const apiHeader = {...this.baseHeader,...header};
    return this.httpClient.delete<T>(url, {headers: apiHeader});
  }
}
