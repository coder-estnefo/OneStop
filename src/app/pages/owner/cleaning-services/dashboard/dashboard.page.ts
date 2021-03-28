import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  addBusiness() {
    this.router.navigate(['cleaning-details']);
  }

  toServices() {
    this.router.navigate(['view-cleaning-services']);
  }

  toBusiness() {
    this.router.navigate(['view-business'])
  }

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
