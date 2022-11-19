import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserAccount } from 'src/app/models/IUserAccount';
import { LocalService } from 'src/app/shared/service/local/local.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseURL: string = environment.BASEURL

  constructor(
    private httpClient: HttpClient,
    private localService: LocalService,
  ) { }
  
  getUserAccounts(params?: HttpParams): Observable<HttpResponse<IUserAccount[]>> {
    return this.httpClient.get<IUserAccount[]>(`${this.baseURL}/user-accounts`, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") }),
      observe: "response", params: params
    })
  }

  addUserAccount(userAccount: IUserAccount): Observable<any> {
    let userId: string = this.localService.getJsonValue("userId")

    return this.httpClient.post<string>(`${this.baseURL}/user/${userId}/accounts`, userAccount, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") })
    })
  }

  updateUserAccount(userAccount: IUserAccount): Observable<string> {
    let userId: string = this.localService.getJsonValue("userId")
    
    return this.httpClient.put<string>(`${this.baseURL}/user/${userId}/accounts/${userAccount.id}`, userAccount, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") })
    })
  }
  
  deleteUserAccount(accountId: string): Observable<string> {
    let userId: string = this.localService.getJsonValue("userId")

    return this.httpClient.delete<string>(`${this.baseURL}/user/${userId}/accounts/${accountId}`, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") })
    })
  }
}
