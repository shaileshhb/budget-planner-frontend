import { ISpending } from "./ISpending"

export interface IEnvelop {
  id?: string
  name: string
  amount: number
  userId: string
  spendings?: ISpending[]
  totalSpending?: number
  type?: string
  showSpending: boolean
}
