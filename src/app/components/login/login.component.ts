import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CredentialService } from 'src/app/service/credential/credential.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private credService: CredentialService,
  ) { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required]),
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

  async login(): Promise<void> {
    try {
      const response = await this.credService.login(this.loginForm.value)
      console.log(response);
    } catch (error) {
      console.error(error);
      alert(error)
    }
  }

}
