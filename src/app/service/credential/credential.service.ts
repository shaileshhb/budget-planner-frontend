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

  login(login: ILogin): Observable<HttpResponse<ICredential>> {
    return this.httpClient.post<ICredential>(`${this.baseURL}/login`, login, {
      headers: new HttpHeaders({ 'Content-type': 'application/json' }),
      observe: "response",
    })
  }

  register(user: IUser): Observable<HttpResponse<ICredential>> {
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
  isVerified?: boolean
  token?: string
}