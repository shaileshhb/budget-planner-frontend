import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserAccount } from 'src/app/models/IUserAccount';
import { IUserSalary } from 'src/app/models/IUserSalary';
import { LocalService } from 'src/app/shared/service/local/local.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private baseURL: string = environment.BASEURL

  constructor(
    private httpClient: HttpClient,
    private localService: LocalService,
  ) { }

  getUserSalaries(params?: HttpParams): Observable<HttpResponse<IUserSalary[]>> {
    return this.httpClient.get<IUserSalary[]>(`${this.baseURL}/user-salary`, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") }),
      observe: "response", params: params
    })
  }

  addUserSalary(userSalary: IUserSalary): Observable<any> {
    let userId: string = this.localService.getJsonValue("userId")

    return this.httpClient.post<any>(`${this.baseURL}/user/${userId}/salary`, userSalary, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") })
    })
  }

  updateUserSalary(userSalary: IUserSalary): Observable<any> {
    let userId: string = this.localService.getJsonValue("userId")

    return this.httpClient.put<any>(`${this.baseURL}/user/${userId}/salary/${userSalary.id}`, userSalary, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") })
    })
  }
  
  deleteUserSalary(userSalaryId: string): Observable<any> {
    let userId: string = this.localService.getJsonValue("userId")

    return this.httpClient.delete<any>(`${this.baseURL}/user/${userId}/salary/${userSalaryId}`, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") })
    })
  }

}
