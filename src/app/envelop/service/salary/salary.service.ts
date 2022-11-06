import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  addUserSalary(salary: IUserSalary): Observable<any> {
    let userId: string = this.localService.getJsonValue("userId")

    return this.httpClient.post<string>(`${this.baseURL}/user/${userId}/salary`, salary, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") })
    })
  }

  updateUserSalary(salary: IUserSalary): Observable<string> {
    let userId: string = this.localService.getJsonValue("userId")
    
    return this.httpClient.put<string>(`${this.baseURL}/user/${userId}/salary/${salary.id}`, salary, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") })
    })
  }
  
  deleteUserSalary(salaryId: string): Observable<string> {
    let userId: string = this.localService.getJsonValue("userId")

    return this.httpClient.delete<string>(`${this.baseURL}/user/${userId}/envelops/${salaryId}`, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") })
    })
  }
}
