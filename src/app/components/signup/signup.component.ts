import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CredentialService, ICredential, IUser } from 'src/app/service/credential/credential.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private credService: CredentialService,
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

  async register(): Promise<void> {
    this.credService.register(this.signupForm.value).subscribe({
      next: (response: HttpResponse<ICredential>) => {
        console.log(response.body);
      },
      error: (err: any) => {
        console.error(err);
        alert(err?.error?.error)
      }
    })
  }

}
