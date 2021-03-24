import { Component, OnInit } from '@angular/core';
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

  userID;
  cleaningID;
  sendTo;
  chats = [];
  text;

  constructor(
    private route: ActivatedRoute,
    private cleaningService: CleaningService,
    private oneSignal: OneSignal,
    private calendar: Calendar
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

  sendMessage() {
    if (this.text) {
      const date = new Date();
      const time = date.getHours() + ':' + date.getMinutes();
      const chat = {
        id: this.cleaningID,
        from: this.userID,
        to: this.sendTo,
        message: this.text,
        time: time,
        date: date,
        requestType: 'cleaning'
      };

      this.cleaningService.startChat(chat).then(() => {
        this.text = '';
      });
    }
  }


  addEvent(chat) {
    console.log(chat);
    //let startdate = new Date(chat.appointmentDate);
    //let enddate = startdate.setMinutes(startdate.getMinutes() + 30);
    let startdate = new Date();
    let enddate = new Date();
    let options = { 
      calendername: "Cleaning Request" + chat.serviceRequest.address, 
      url: '', 
      firstReminderMinute: 30 
    };

    this.calendar
      .createEventInteractivelyWithOptions('new event', chat.propertyName, 'notes',startdate, enddate, options)
      .then(()=>{
        //alert("Event is set");
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

}
