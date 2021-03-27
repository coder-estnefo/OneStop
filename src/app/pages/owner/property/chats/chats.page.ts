import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { PropertyService } from 'src/app/services/property/property.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  userID;
  propertyChats = [];
  

  constructor(
    private router: Router,
    private loginService: LoginService,
    private propertyService: PropertyService,
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
    this.propertyService.getChats(this.userID).subscribe((response) => {
      this.propertyChats = response.map((chats) => {
        return {
          id: chats.payload.doc.id,
          ...(chats.payload.doc.data() as Object),
        };
      });

      const temp_chats = this.propertyChats.sort((a, b) => b.date - a.date);
      this.propertyChats = temp_chats;

      const result = [];
      const map = new Map();
      for (const item of this.propertyChats) {
          if(!map.has(item.chatID)){
              map.set(item.chatID, true);    // set any value to Map
              result.push({
                ...item
              });
            }
        }
        this.propertyChats = result;
    });
  }

  toMessages(chat) {
    const { id, to, from } = chat;
    this.router.navigate(['messages'], {
      queryParams: { propertyID: id, userID: to, sendTo: from },
    });
  }
}
