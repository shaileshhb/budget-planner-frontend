import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IUserAccount } from 'src/app/models/IUserAccount';
import { IUserSalary } from 'src/app/models/IUserSalary';
import { IUser } from 'src/app/service/credential/credential.service';
import { LocalService } from 'src/app/shared/service/local/local.service';
import { ToastService } from 'src/app/shared/service/toast/toast.service';
import { AccountService } from '../../service/account/account.service';
import { SalaryService } from '../../service/salary/salary.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private salaryService: SalaryService,
    private localService: LocalService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) { }

  isGetCompleted: boolean = false

  ngOnInit(): void {
    this.createAccountForm()
    this.getUserAccounts()
  }

  accountForm!: FormGroup

  createAccountForm(): void {
    this.accountForm = new FormGroup({
      id: new FormControl<string | null>(null),
      name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2)]),
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

    this.isGetCompleted = false
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
      },
      complete: () => {
        this.isGetCompleted = true
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


  @ViewChild('salaryModal') salaryModal!: TemplateRef<any>
  userSalaryForm!: FormGroup

  createSalaryForm(): void {
    this.userSalaryForm = new FormGroup({
      id: new FormControl<string | null>(null),
      accountId: new FormControl<string | null>(null, [Validators.required]),
      salary: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
      salaryType: new FormControl<string | null>(null, [Validators.required])
    })
  }

  onAddSalaryClick(): void {
    this.isAddOperation = true

    this.createSalaryForm()
    this.openModal(this.salaryModal)
  }

  onSaveSalaryClick(): void {
    console.log(this.userSalaryForm.controls);

    if (this.userSalaryForm.invalid) {
      this.userSalaryForm.markAllAsTouched()
      return
    }

    this.addUserSalary()
  }

  addUserSalary(): void {
    this.message = "Adding salary"
    this.toastService.show(this.messageTemplate, { classname: 'bg-info text-light', delay: 1000 })

    this.salaryService.addUserSalary(this.userSalaryForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
        this.message = "Salary successfully added"
        this.toastService.clear()
        this.userSalaryForm.reset()
        this.isAddOperation = false
        this.toastService.show(this.messageTemplate, { classname: 'bg-success text-light', delay: 5000 })
        this.modalRef.close()
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

  userSalaries: IUserSalary[] = []
  
  getUserSalaries(userAccount: IUserAccount): void {
    this.userAccounts = []

    const queryparams: any = {
      accountId: userAccount.id
    }

    this.isGetCompleted = false
    this.salaryService.getUserSalaries(queryparams).subscribe({
      next: (response: HttpResponse<IUserSalary[]>) => {
        this.userSalaries = response.body!
        console.log(this.userSalaries);
      },
      error: (err: any) => {
        console.error(err);
        this.message = err?.error?.error
        this.toastService.show(this.messageTemplate, { classname: 'bg-danger text-light', delay: 5000 })
      },
      complete: () => {
        this.isGetCompleted = true
      }
    })
  }

  @ViewChild("viewSalaryModal") viewSalaryModal!: TemplateRef<any>

  onViewSalaryClick(userAccount: IUserAccount): void {
    this.getUserSalaries(userAccount)
    this.openModal(this.viewSalaryModal)
  }

  modalRef!: NgbModalRef

  openModal(modalContent: TemplateRef<any>, modalSize: string = "lg", modalOptions?: NgbModalOptions): void {

    if (!modalOptions) {
      modalOptions = {
        backdrop: 'static',
        size: modalSize,
        keyboard: false,
      }
    }

    this.modalRef = this.modalService.open(modalContent, modalOptions)
  }

}
