import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.localService.getJsonValue("token")) {
      this.router.navigate(["account"])
      // this.router.navigate(["envelop/dashboard"])
      return
    }
    this.router.navigate(["login"])
  }

  get isNavbarVisible(): boolean {
    return this.localService.getJsonValue("token")
  }
}
