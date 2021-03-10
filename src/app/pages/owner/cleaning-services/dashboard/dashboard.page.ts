import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private router: Router
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

}
