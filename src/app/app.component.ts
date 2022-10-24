import { Component, OnInit } from '@angular/core';
import { LocalService } from './shared/service/local/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  // isNavbarVisible: boolean = false;

  constructor(
    private localService: LocalService,
  ) { }

  ngOnInit(): void {}

  get isNavbarVisible(): boolean {
    return this.localService.getJsonValue("token")
  }
}
