import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/services/property/property.service';
import { Calendar } from '@ionic-native/calendar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  userID;
  propID;
  sendTo;
  chats = [];
  text;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private oneSignal: OneSignal,
    private calendar: Calendar
  ) {}

  ngOnInit() {

    this.calendar.createCalendar('MyCalendar').then(
    );
    this.route.queryParams.subscribe((param) => {
      this.userID = param.userID;
      this.propID = param.propertyID;
      this.sendTo = param.sendTo;

      this.propertyService.getChats(this.userID).subscribe((response) => {
      this.chats = response.map((chats) => {
        return {
          id: chats.payload.doc.id,
          ...(chats.payload.doc.data() as Object),
        };
      });
      
      this.chats = this.chats.filter((chat) => {
        return (
          (chat.from === this.userID && chat.to === this.sendTo) ||
          (chat.from === this.sendTo && chat.to === this.userID)
        )
      });

      const temp_chats = this.chats
        .filter((chats) => chats.id === this.propID)
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
        id: this.propID,
        from: this.userID,
        to: this.sendTo,
        message: this.text,
        time: time,
        date: date,
      };

      this.propertyService.startChat(chat).then(() => {
        this.text = '';
      });
    }
  }


  addEvent(chat) {
    console.log(chat);
    let dt = chat.appointmentDate;
    let dd = dt.slice(0,2);
    let mm = dt.slice(3,5);
    let yyyy = dt.slice(6,10);
    let time = dt.slice(11);
    let newDate = yyyy + "/" + mm + "/" + dd +" " + time;
    let startdate = new Date(newDate);
    let newDateEnd = new Date(newDate);
    let enddate = new Date(newDateEnd.setMinutes(newDateEnd.getMinutes() + 30));

    let options = { 
      calendername: "Viewing Appointment", 
      url: '', 
      firstReminderMinute: 15 
    };

    this.calendar
      .createEventInteractivelyWithOptions('Viewing appointment', chat.propertyName, '',startdate, enddate, options)
      .then(()=>{
        alert("Event is set");
        this.text = "Appointment Date Accepted for: " + dt;
        this.sendMessage();
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
