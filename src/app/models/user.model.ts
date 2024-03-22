/** 人員 實體 */
export interface User {
  id?: string;
  name: string;
  country: string;
  salary: number | null;
  email: string;
};
/** 獲取人員列表 傳參 */
export interface GetUserListParams {
  name?: string;
  country?: string;
  salary?: number | null;
  email?: string;
  id?: string;
}
/** 新增人員 傳參 */
export interface CreateUserParams {
  name: string;
  country: string;
  salary: number;
  email: string;
}
/** 編輯人員 傳參 */
export interface EditUserParams {
  id: string;
  name: string;
  country: string;
  salary: number;
  email: string;
}
