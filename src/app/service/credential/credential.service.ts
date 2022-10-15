import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  private baseURL: string = environment.BASEURL

  constructor(
    private httpClient: HttpClient,
  ) { }

  login(login: ILogin): Promise<ICredential | null> {
    return new Promise<ICredential | null>((resolve, reject) => {
      this.httpClient.post(`${this.baseURL}/login`, login, {
        headers: new HttpHeaders({ 'Content-type': 'application/json' }),
        observe: "response",
      }).subscribe(({
        next(value: HttpResponse<ICredential>) {
          resolve(value.body)
        },
        error(err: any) {
          reject(err)
        },
      }))
    })
  }

  register(user: IUser): Observable<HttpResponse<IUser>> {
    return this.httpClient.post(`${this.baseURL}/register`, user, {
      headers: new HttpHeaders({ 'Content-type': 'application/json' }),
      observe: "response",
    })
  }
}

export interface ILogin {
  email?: string
  password?: string
}

export interface IUser {
  id?: string
  name?: string
  username?: string
  email?: string
  password?: string
  dateOfBirth?: string
  gender?: string
  contact?: string
  profileImage?: string
  isVerified?: boolean
}

export interface ICredential {
  id?: string
  name?: string
  token?: string
}