import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IEnvelop } from 'src/app/models/IEnvelop';
import { IUserAccount } from 'src/app/models/IUserAccount';
import { IUserSalary } from 'src/app/models/IUserSalary';
import { LocalService } from 'src/app/shared/service/local/local.service';
import { ToastService } from 'src/app/shared/service/toast/toast.service';
import { AccountService } from '../../service/account/account.service';
import { EnvelopService } from '../../service/envelop/envelop.service';
import { SalaryService } from '../../service/salary/salary.service';

@Component({
  selector: 'app-envelop',
  templateUrl: './envelop.component.html',
  styleUrls: ['./envelop.component.scss']
})
export class EnvelopComponent implements OnInit {

  message: string = ""
  @ViewChild("messageTemplate") messageTemplate!: TemplateRef<any>;

  constructor(
    private envelopService: EnvelopService,
    private localService: LocalService,
    private modalService: NgbModal,
    private toastService: ToastService,
  ) { }

  envelops: IEnvelop[] | null = []
  totalMonthlyBudget: number = 0

  ngOnInit(): void {
    this.getEnvelops()
  }

  isGetCompleted: boolean = true

  getEnvelops(): void {
    let queryparams: any = {
      userId: this.localService.getJsonValue("userId")
    }
    this.isGetCompleted = false
    this.envelopService.getEnvelops(queryparams).subscribe({
      next: (response: HttpResponse<IEnvelop[]>) => {
        this.envelops = response.body
        this.calculateTotalSpending()
        console.log(response.body);
      },
      error: (err: any) => {
        console.error(err);
        alert(err?.error?.error)
      }
    }).add(() => {
      this.isGetCompleted = true
    })
  }

  calculateTotalSpending(): void {
    for (let index = 0; index < this.envelops!.length; index++) {
      const envelop = this.envelops![index]
      this.totalMonthlyBudget += parseInt(this.envelops![index].amount.toString())
      envelop.showSpending = false
      envelop.totalSpending = 0
      for (let j = 0; j < envelop.spendings!.length; j++) {
        envelop.totalSpending += parseInt(envelop.spendings![j].amount!)
      }
      envelop.type = ((envelop.totalSpending / parseInt(envelop.amount.toString())) * 100 <= 50) ? 'success' : 
        (((envelop.totalSpending / parseInt(envelop.amount.toString())) * 100 <= 75) ? 'warning' : 'danger')
    }
  }

  currentEnvelop!: IEnvelop

  onProgressClick(envelop: IEnvelop): void {
    this.currentEnvelop = envelop  
  }

  envelopForm!: FormGroup

  createEnvelopForm(): void {
    this.envelopForm = new FormGroup({
      id: new FormControl<string | null>(null),
      name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      amount: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
      userId: new FormControl<string>(this.localService.getJsonValue("userId")),
      salaryId: new FormControl<string | null>(null, [Validators.required]),
    })
  }

  isAddOperation: boolean = false
  isUpdateOperation: boolean = false

  @ViewChild("envelopModal") envelopModal!: TemplateRef<any>

  onAddClick(): void {
    this.isAddOperation = true
    this.isUpdateOperation = false

    this.createEnvelopForm()
    this.openModal(this.envelopModal)
  }

  onUpdateClick(envelop: IEnvelop): void {
    this.isAddOperation = false
    this.isUpdateOperation = true

    this.createEnvelopForm()
    this.envelopForm.patchValue(envelop)
    this.openModal(this.envelopModal)
  }

  onDeleteClick(): void {
  }

  onSaveClick(): void {
    console.log(this.envelopForm.controls);

    if (this.envelopForm.invalid) {
      this.envelopForm.markAllAsTouched()
      return
    }

    if (this.isUpdateOperation) {
      this.updateEnvelop()
      return
    }

    this.addEnvelop()
  }

  addEnvelop(): void {
    this.envelopService.addEnvelop(this.envelopForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
        this.modalRef.close()
        this.getEnvelops()
      },
      error: (err: any) => {
        console.error(err);
        alert(err?.error?.error)
      }
    })
  }

  updateEnvelop(): void {
    this.envelopService.updateEnvelop(this.envelopForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
        this.modalRef.close()
        this.getEnvelops()
      },
      error: (err: any) => {
        console.error(err);
        alert(err?.error?.error)
      }
    })
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
