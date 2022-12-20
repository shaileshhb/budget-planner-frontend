import { IUserAccount } from "./IUserAccount"

export interface IUserSalary {
  id?: string
  accountId: string
  account: IUserAccount
  salary: number
  salaryType: string
  isEditClicked?: boolean
}