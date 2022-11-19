import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/shared/service/local/local.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private localService: LocalService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  logout(): void {
    this.localService.clearLocalStorage()
    this.router.navigate(["login"])
  }
}
