import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialService, ICredential } from 'src/app/service/credential/credential.service';
import { LocalService } from 'src/app/shared/service/local/local.service';
import { ToastService } from 'src/app/shared/service/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    CredentialService,
  ]
})
export class LoginComponent implements OnInit {

  message: string = ""
  @ViewChild("messageTemplate") messageTemplate!: TemplateRef<any>;

  isPasswordVisible: boolean = false

  constructor(
    private credService: CredentialService,
    private localService: LocalService,
    private router: Router,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [Validators.required]),
  })

  validateForm(): void {
    console.log(this.loginForm.controls);
    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }
    
    this.login()
  }

  credential: ICredential | null = null

  async login(): Promise<void> {
    this.credService.login(this.loginForm.value).subscribe({
      next: (response: HttpResponse<ICredential>) => {
        console.log(response.body);
        this.credential = response.body
        this.localService.setJsonValue("userId", this.credential?.id)
        this.localService.setJsonValue("name", this.credential?.name)
        this.localService.setJsonValue("token", this.credential?.token)
        this.localService.setJsonValue("isVerified", this.credential?.isVerified)
        this.router.navigate(["account"])
      },
      error: (err: any) => {
        console.error(err);
        // alert(err?.error?.error)
        if (err?.error) {
          this.message = err?.error?.error
          this.toastService.show(this.messageTemplate, { classname: 'bg-danger text-light', delay: 5000 })
          return
        }

        this.message = "Unknown error"
        this.toastService.show(this.messageTemplate, { classname: 'bg-danger text-light', delay: 5000 })
      }
    })
  }

  navigateToRegister(): void {
    console.log("navigateToRegister");
    this.router.navigate(['register'])
  }

}
