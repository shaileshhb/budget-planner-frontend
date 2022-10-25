import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialService, ICredential } from 'src/app/service/credential/credential.service';
import { LocalService } from 'src/app/shared/service/local/local.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent implements OnInit {

  constructor(
    private credService: CredentialService,
    private localService: LocalService,
    private router: Router,
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
        this.router.navigate(["envelop", "dashboard"])
      },
      error: (err: any) => {
        console.error(err);
        alert(err)
      }
    })
  }

  navigateToRegister(): void {
    console.log("navigateToRegister");
    this.router.navigate(['register'])
  }

}
