import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserAccount } from 'src/app/models/IUserAccount';
import { environment } from 'src/environments/environment';
import { LocalService } from '../local/local.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseURL: string = environment.BASEURL

  constructor(
    private httpClient: HttpClient,
    private localService: LocalService,
  ) { }

  getAccounts(params?: HttpParams): Observable<HttpResponse<IUserAccount[]>> {
    return this.httpClient.get<IUserAccount[]>(`${this.baseURL}/user-accounts`, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") }),
      observe: "response", params: params
    })
  }

  addUserAccount(account: IUserAccount): Observable<any> {
    let userId: string = this.localService.getJsonValue("userId")

    return this.httpClient.post<any>(`${this.baseURL}/user/${userId}/accounts`, account, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") })
    })
  }

  updateUserAccount(account: IUserAccount): Observable<any> {
    let userId: string = this.localService.getJsonValue("userId")

    return this.httpClient.put<any>(`${this.baseURL}/user/${userId}/accounts/${account.id}`, account, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") })
    })
  }
  
  deleteUserAccount(accountId: string): Observable<any> {
    let userId: string = this.localService.getJsonValue("userId")

    return this.httpClient.delete<any>(`${this.baseURL}/user/${userId}/accounts/${accountId}`, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") })
    })
  }
}
