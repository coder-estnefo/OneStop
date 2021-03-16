import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { PropertyService } from 'src/app/services/property/property.service';

@Component({
  selector: 'app-viewing-dates',
  templateUrl: './viewing-dates.page.html',
  styleUrls: ['./viewing-dates.page.scss'],
})
export class ViewingDatesPage implements OnInit {
  // days = [
  //   { day: 0, name: 'Monday', checked: false, from: '09:00', to: '16:00' },
  //   { day: 1, name: 'Tuesday', checked: false, from: '09:00', to: '16:00' },
  //   { day: 2, name: 'Wednesday', checked: false, from: '09:00', to: '16:00' },
  //   { day: 3, name: 'Thursday', checked: false, from: '09:00', to: '16:00' },
  //   { day: 4, name: 'Friday', checked: false, from: '09:00', to: '16:00' },
  //   { day: 5, name: 'Saturday', checked: false, from: '09:00', to: '16:00' },
  //   { day: 6, name: 'Sunday', checked: false, from: '09:00', to: '16:00' },
  // ];

  days;
  userID;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private auth: AngularFireAuth,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.userID = user.uid;
      this.getDays(this.userID);
    });
  }

  addDates() {
    console.log(this.days);
  }

  setDay(day,checked) {
    const newDays = this.days.days;
    newDays[day].checked = !checked;
    this.propertyService.setViewingDates(this.userID, newDays);
  }

  getDays(ownerID) {
    this.propertyService.getViewingDates(ownerID).subscribe((response) => {
      this.days = response.payload.data();
    });
  }

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
