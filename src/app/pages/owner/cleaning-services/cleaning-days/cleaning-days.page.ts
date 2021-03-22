import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-cleaning-days',
  templateUrl: './cleaning-days.page.html',
  styleUrls: ['./cleaning-days.page.scss'],
})
export class CleaningDaysPage implements OnInit {

   defaultDays = [
    { day: 0, name: 'Monday', checked: false, from: '09:00', to: '16:00' },
    { day: 1, name: 'Tuesday', checked: false, from: '09:00', to: '16:00' },
    { day: 2, name: 'Wednesday', checked: false, from: '09:00', to: '16:00' },
    { day: 3, name: 'Thursday', checked: false, from: '09:00', to: '16:00' },
    { day: 4, name: 'Friday', checked: false, from: '09:00', to: '16:00' },
    { day: 5, name: 'Saturday', checked: false, from: '09:00', to: '16:00' },
    { day: 6, name: 'Sunday', checked: false, from: '09:00', to: '16:00' },
  ];

  days;
  userID;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private auth: AngularFireAuth,
    private cleaningService: CleaningService
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
    this.cleaningService.setViewingDates(this.userID, newDays);
  }

  updateTime(day, to, from) {
    const newDays = this.days.days;
    newDays[day].to = to;
    newDays[day].from = from;
    this.cleaningService.setViewingDates(this.userID, newDays);
  }

  getDays(ownerID) {
    this.cleaningService.getViewingDates(ownerID).subscribe((response) => {
      this.days = response.payload.data();
      if (!this.days) {
        this.cleaningService.setViewingDates(ownerID, this.defaultDays);
      }
    });
  }

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
