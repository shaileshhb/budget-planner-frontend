import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEnvelop } from 'src/app/models/IEnvelop';
import { LocalService } from 'src/app/shared/service/local/local.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvelopService {

  private baseURL: string = environment.BASEURL

  constructor(
    private httpClient: HttpClient,
    private localService: LocalService,
  ) { }

  getEnvelops(params?: HttpParams): Observable<HttpResponse<IEnvelop[]>> {
    return this.httpClient.get<IEnvelop[]>(`${this.baseURL}/envelops`, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") }),
      observe: "response", params: params
    })
  }

  addEnvelop(envelop: IEnvelop): Observable<any> {
    let userId: string = this.localService.getJsonValue("userId")

    return this.httpClient.post<string>(`${this.baseURL}/user/${userId}/envelops`, envelop, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") })
    })
  }

  updateEnvelop(envelop: IEnvelop): Observable<string> {
    let userId: string = this.localService.getJsonValue("userId")
    
    return this.httpClient.put<string>(`${this.baseURL}/user/${userId}/envelops/${envelop.id}`, envelop, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") })
    })
  }
  
  deleteEnvelop(envelopId: string): Observable<string> {
    let userId: string = this.localService.getJsonValue("userId")

    return this.httpClient.delete<string>(`${this.baseURL}/user/${userId}/envelops/${envelopId}`, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.localService.getJsonValue("token") })
    })
  }
}
