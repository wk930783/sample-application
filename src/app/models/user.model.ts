/** 使用者基本資料
 * @param userName: 使用者名稱
 * @param roleCode: 角色碼
 * @param roleName: 角色名稱
 * @param moduleCode: 模組碼
 */
export type User = {
  userName: string;
  roleCode : string;
  roleName: string;
  token: string;
  teamId: string;
  account: string;
  remark: string;
}

export type UpdateUserInfoParams = {
  userName: string;
  account: string;
  remark: string;
}
