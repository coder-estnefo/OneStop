import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CarWashService } from 'src/app/services/car-wash/car-wash.service';
import { LoginService } from 'src/app/services/login/login.service';
import { PropertyService } from 'src/app/services/property/property.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  carWashCount = 0;

  constructor(
    private auth: AngularFireAuth,
    private carWashService: CarWashService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      let userID = user.uid;
      this.carWashService
        .getOwnerCarwashes(userID)
        .subscribe((carWashes) => {
          this.carWashCount = carWashes.length;
        });
    });
  }

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
