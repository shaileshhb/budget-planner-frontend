import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IEnvelop } from 'src/app/models/IEnvelop';
import { LocalService } from 'src/app/shared/service/local/local.service';
import { EnvelopService } from '../../service/envelop/envelop.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userId: string | null = null

  constructor(
    private envelopService: EnvelopService,
    private localService: LocalService,
  ) { }

  ngOnInit(): void {
    this.userId = this.localService.getJsonValue("userId")
    this.getEnvelops()
  }

  envelops: IEnvelop[] = []

  getEnvelops(): void {
    let queryparams: any = {
      userId: this.userId,
    }

    this.envelops = []

    this.envelopService.getEnvelops(queryparams).subscribe({
      next: (response: HttpResponse<IEnvelop[]>) => {
        console.log(response.body);
        this.envelops = response.body as IEnvelop[]
      },
      error: (err: any) => {
        console.error(err?.error?.error);
      }
    })
  }

}
