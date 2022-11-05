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
    this.getUserAccounts()
  }

  accountForm!: FormGroup

  createAccountForm(): void {
    this.accountForm = new FormGroup({
      id: new FormControl<string | null>(null, [Validators.required]),
      name: new FormControl<string | null>(null, [Validators.required]),
      userId: new FormControl<string>(this.localService.getJsonValue("userId")),
      account: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    })
  }

  userAccounts: IUserAccount[] = []
  totalAmount: number = 0
  errorMessage: string = ""

  @ViewChild("errorTemplate") errorTemplate!: TemplateRef<any>

  getUserAccounts(): void {
    this.userAccounts = []
    this.totalAmount = 0
    this.accountService.getUserAccounts().subscribe({
      next: (response: HttpResponse<IUserAccount[]>) => {
        this.userAccounts = response.body!
        this.calculateTotalAmount()
      },
      error: (err: any) => {
        console.error(err);
        this.errorMessage = err?.error?.error
        this.toastService.show(this.errorTemplate, { classname: 'bg-danger text-light', delay: 5000 })
      }
    })
  }

  calculateTotalAmount(): void {
    this.userAccounts.filter((value: IUserAccount) => this.totalAmount += value.amount)
  }

  onDeleteClick(userAccount: IUserAccount): void {
    console.log(userAccount);
  }
}
