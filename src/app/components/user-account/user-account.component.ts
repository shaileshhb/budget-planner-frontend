import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUserAccount } from 'src/app/models/IUserAccount';
import { AccountService } from 'src/app/shared/service/account/account.service';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { ToastService } from 'src/app/shared/service/toast/toast.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalService } from 'src/app/shared/service/local/local.service';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private localService: LocalService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.createAccountForm()
    this.getUserAccounts()
  }

  accountForm!: FormGroup

  createAccountForm(): void {
    this.accountForm = new FormGroup({
      id: new FormControl<string | null>(null),
      name: new FormControl<string | null>(null, [Validators.required]),
      userId: new FormControl<string>(this.localService.getJsonValue("userId")),
      amount: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    })
  }

  userAccounts: IUserAccount[] = []
  totalAmount: number = 0
  message: string = ""

  @ViewChild("messageTemplate") messageTemplate!: TemplateRef<any>

  getUserAccounts(): void {
    this.userAccounts = []
    this.totalAmount = 0

    const queryparams: any = {
      userId: this.localService.getJsonValue("userId")
    }

    this.accountService.getAccounts(queryparams).subscribe({
      next: (response: HttpResponse<IUserAccount[]>) => {
        this.userAccounts = response.body!
        console.log(this.userAccounts);
        this.calculateTotalAmount()
      },
      error: (err: any) => {
        console.error(err);
        this.message = err?.error?.error
        this.toastService.show(this.messageTemplate, { classname: 'bg-danger text-light', delay: 5000 })
      }
    })
  }

  calculateTotalAmount(): void {
    this.userAccounts.filter((value: IUserAccount) => {
      this.totalAmount += parseInt(value.amount)
      value.isEditClicked = false
    })
  }

  isAddOperation: boolean = false
  isEditOperation: boolean = false

  onAddClick(): void {
    this.isAddOperation = true
    this.isEditOperation = false
    this.createAccountForm()
  }

  cancelAdd(): void {
    this.isAddOperation = false
    this.accountForm.reset()
  }

  onEditClick(userAccount: IUserAccount): void {
    this.isAddOperation = false
    this.isEditOperation = true
    userAccount.isEditClicked = true
    this.createAccountForm()
    this.accountForm.patchValue(userAccount)
  }

  cancelEdit(userAccount: IUserAccount): void {
    userAccount.isEditClicked = false
    this.isEditOperation = false
    this.accountForm.reset()
  }

  onDeleteClick(event: Event, userAccount: IUserAccount): void {
    event.stopPropagation()
    console.log(userAccount);
  }

  onSubmitClick(): void {
    console.log(this.accountForm.controls);

    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched()
      return
    }

    if (this.isAddOperation) {
      this.addUserAccount()
      return
    }

    this.updateUserAccount()
  }

  addUserAccount(): void {
    this.message = "Adding account"
    this.toastService.show(this.messageTemplate, { classname: 'bg-info text-light', delay: 1000 })

    this.accountService.addUserAccount(this.accountForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
        this.message = "Account successfully added"
        this.toastService.clear()
        this.accountForm.reset()
        this.isAddOperation = false
        this.toastService.show(this.messageTemplate, { classname: 'bg-success text-light', delay: 5000 })
        this.getUserAccounts()
      },
      error: (err: any) => {
        console.error(err);
        this.message = err?.error?.error
        this.toastService.clear()
        this.toastService.show(this.messageTemplate, { classname: 'bg-danger text-light', delay: 5000 })
      }
    }).add(() => {

    })
  }

  updateUserAccount(): void {
    this.message = "Updating account"
    this.toastService.show(this.messageTemplate, { classname: 'bg-info text-light', delay: 1000 })

    this.accountService.updateUserAccount(this.accountForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
        this.message = "Account successfully updated"
        this.isEditOperation = false
        this.toastService.clear()
        this.getUserAccounts()
        this.toastService.show(this.messageTemplate, { classname: 'bg-success text-light', delay: 5000 })
      },
      error: (err: any) => {
        console.error(err);
        this.message = err?.error?.error
        this.toastService.show(this.messageTemplate, { classname: 'bg-danger text-light', delay: 5000 })
      }
    }).add(() => {

    })
  }

  deleteUserAccount(accountId: string): void {
    this.message = "Deleting account"
    this.toastService.show(this.messageTemplate, { classname: 'bg-info text-light', delay: 1000 })

    this.accountService.deleteUserAccount(accountId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.message = "Account successfully deleted"
        this.toastService.clear()
        this.getUserAccounts()
        this.toastService.show(this.messageTemplate, { classname: 'bg-success text-light', delay: 5000 })
      },
      error: (err: any) => {
        console.error(err);
        this.message = err?.error?.error
        this.toastService.show(this.messageTemplate, { classname: 'bg-danger text-light', delay: 5000 })
      }
    })
  }


}
