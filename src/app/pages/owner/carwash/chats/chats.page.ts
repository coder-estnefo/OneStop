import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CarWashService } from 'src/app/services/car-wash/car-wash.service';

import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
 userID;
  carwashChats = [];

  constructor(
    private router: Router,
    private loginService: LoginService,
    private carWashService: CarWashService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userID = user.uid;
        this.getPropertiesChats();
      }
    });
  }

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }


  getPropertiesChats() {
    this.carWashService.getChats(this.userID).subscribe((response) => {
      this.carwashChats = response.map((chats) => {
        return {
          id: chats.payload.doc.id,
          ...(chats.payload.doc.data() as Object),
        };
      });

      const temp_chats = this.carwashChats.sort((a, b) => b.date - a.date);
      this.carwashChats = temp_chats;
    });
  }

  toMessages(chat) {
    const { id, to, from } = chat;
    this.router.navigate(['carWash-messages'], {
      // queryParams: { propertyID: id, userID: to, sendTo: from },
      queryParams: { id: id, userID: to, sendTo: from },
    });
  }

}
