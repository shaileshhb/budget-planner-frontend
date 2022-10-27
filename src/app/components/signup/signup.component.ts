import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialService, ICredential } from 'src/app/service/credential/credential.service';
import { LocalService } from 'src/app/shared/service/local/local.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    CredentialService,
  ],
})
export class SignupComponent implements OnInit {

  constructor(
    private credService: CredentialService,
    private localService: LocalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  signupForm: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null),
    username: new FormControl<string | null>(null),
    email: new FormControl<string | null>(null),
    password: new FormControl<string | null>(null),
    dateOfBirth: new FormControl<string | null>(null),
    gender: new FormControl<string | null>(null),
    contact: new FormControl<string | null>(null),
    isVerified: new FormControl<boolean>(false),
    profileImage: new FormControl<string | null>(null),
  })

  
  validateForm(): void {
    console.log(this.signupForm.controls);
    
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched()
      return
    }
    
    this.register()
  }

  credential: ICredential | null = null

  async register(): Promise<void> {
    this.credService.register(this.signupForm.value).subscribe({
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
        alert(err?.error?.error)
      }
    })
  }

}
