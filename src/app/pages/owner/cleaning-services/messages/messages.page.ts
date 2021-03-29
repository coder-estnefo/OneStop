import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from '@ionic-native/calendar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  app_id = '7d9fb1a3-b3d6-4705-99e4-d0f04e1160b3';
  messageId = '';

  userID;
  cleaningID;
  sendTo;
  chats = [];
  text;

  constructor(
    private route: ActivatedRoute,
    private cleaningService: CleaningService,
    private oneSignal: OneSignal,
    private calendar: Calendar,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {

    this.calendar.createCalendar('MyCalendar').then(
    );
    this.route.queryParams.subscribe((param) => {
      this.userID = param.userID;
      this.cleaningID = param.id;
      this.sendTo = param.sendTo;

      this.cleaningService.getChats(this.userID).subscribe((response) => {
      this.chats = response.map((chats) => {
        return {
          id: chats.payload.doc.id,
          ...(chats.payload.doc.data() as Object),
        };
      });
      console.log(this.chats);
      
      this.chats = this.chats.filter((chat) => {
        return (
          (chat.from === this.userID && chat.to === this.sendTo) ||
          (chat.from === this.sendTo && chat.to === this.userID)
        )
      });

      const temp_chats = this.chats
        .filter((chats) => chats.id === this.cleaningID)
        .sort((a, b) => a.date - b.date);
      this.chats = temp_chats;
      console.log(this.chats);
    });
    });

    
  }

  sendMessage(chatObj) {
    if (this.text) {
      const date = new Date();
      const time = date.getHours() + ':' + date.getMinutes();
      const chat = {
         ...chatObj,
        id: this.cleaningID,
        from: this.userID,
        to: this.sendTo,
        message: this.text,
        time: time,
        date: date,
        requestType: 'cleaning',
      };

      console.log(chat)

      this.cleaningService.startChat(chat).then(() => {
        //this.sendNotification();
        //this.text = '';
      });
    }
  }


  addEvent(chat) {
    console.log(chat);
    let dt = chat.requestDate;
    let dd = dt.slice(0,2);
    let mm = dt.slice(3,5);
    let yyyy = dt.slice(6,10);
    let time = dt.slice(11);
    let newDate = yyyy + "/" + mm + "/" + dd +" " + time;
    let startdate = new Date(newDate);
    let newDateEnd = new Date(newDate);
    let enddate = new Date(newDateEnd.setMinutes(newDateEnd.getMinutes() + 30));

    let options = { 
      calendername: "Cleaning Request" + chat.serviceRequest.address, 
      url: '', 
      firstReminderMinute: 30 
    };

    this.calendar
      .createEventInteractivelyWithOptions('Cleaning Request', chat.serviceRequest.address, '',startdate, enddate, options)
      .then(()=>{
        this.text = "Cleaning Request Accepted for: " + dt;
        this.sendMessage(chat);
      })
  }

  deleteEvent(){
    let startdate = new Date()
    let enddate = new Date()
    let options = { calendername: "MyCalendar", url: 'http://ionicacademy.com', firstReminderMinute: 15 };
    this.calendar.deleteEvent('new event', 'munster', 'notes',startdate, enddate).then(()=>{
      alert("event deleted");
    })
  }

  getUser(userID) {
    return this.firestore.collection("Users")
      .doc(userID)
      .snapshotChanges();
  }

  sendNotification() {
    let id;
    let userData;
    let temp = [];
    
    this.getUser(this.sendTo).subscribe((user) => {
      id = user.payload.id;
      userData = user.payload.data();
      temp.push(userData);

      temp.forEach((a) => {
        console.log(a);
        this.messageId = a.chat_id;
      });

      console.log(this.messageId);

      let notificationObj = {
        contents: {
          en: this.text,
        },
        app_id: this.app_id,
        external_user_id: this.userID,
        include_player_ids: [this.messageId],
        data: {
          userID: this.userID,
          sendTo: this.sendTo,
          type: 'cleaningyChat'
        }
      };

      this.oneSignal
        .postNotification(notificationObj)
        .then((success) => {
          // handle received here how you wish.
          //alert('message from ' + this.userId + ' to ' + this.user_id);
          // alert(JSON.stringify(success));
          //alert('message send');
          this.text = "";
        })
        .catch((error) => {
          //alert(error.message);
          //alert(JSON.stringify(error));
        });
    });
  }

}
