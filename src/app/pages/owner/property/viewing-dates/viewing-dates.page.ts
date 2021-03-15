import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-viewing-dates',
  templateUrl: './viewing-dates.page.html',
  styleUrls: ['./viewing-dates.page.scss'],
})
export class ViewingDatesPage implements OnInit {

  days = [
    {day: 0, name: "Monday", checked: false, from: "09:00", to: "16:00"},
    {day: 1, name: "Tuesday", checked: false, from: "09:00", to: "16:00" },
    {day: 2, name: "Wednesday", checked: false, from: "09:00", to: "16:00"},
    {day: 3, name: "Thursday", checked: false, from: "09:00", to: "16:00"},
    {day: 4, name: "Friday", checked: false, from: "09:00", to: "16:00" },
    {day: 5, name: "Saturday", checked: false, from: "09:00", to: "16:00" },
    {day: 6, name: "Sunday", checked: false, from: "09:00", to: "16:00"},
  ]

  constructor(
    private loginService: LoginService,
    private router: Router,
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      console.log(user.uid)
    })
  }

  addDates() {
    console.log(this.days)
  }

  test($event) {
    console.log("changed", $event)
  }

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
