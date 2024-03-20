/** 人員 實體 */
export interface Person {
  id?: string;
  name: string;
  country: string;
  salary: number;
  email: string;
};
/** 獲取人員列表 傳參 */
export type GetPersonListParams = {
  name?: string;
  country?: string;
  salary?: number | null;
  email?: string;
  id?: string;
}
/** 新增人員 傳參 */
export type CreatePersonParams = {
  name: string;
  country: string;
  salary: number;
  email: string;
}
/** 編輯人員 傳參 */
export type EditPersonParams = {
  id: string;
  name: string;
  country: string;
  salary: number;
  email: string;
}
