import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { PropertyService } from 'src/app/services/property/property.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  propertiesCount = 0;

  constructor(
    private auth: AngularFireAuth,
    private propertyService: PropertyService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      let userID = user.uid;
      this.propertyService
        .getOwnerProperties(userID)
        .subscribe((properties) => {
          this.propertiesCount = properties.length;
        });
    });
  }

  toDates() {
    this.router.navigate(['/viewing-dates'])
  }

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
