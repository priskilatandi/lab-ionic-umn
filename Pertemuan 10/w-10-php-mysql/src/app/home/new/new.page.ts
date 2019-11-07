import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookingsService } from '../bookings.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  constructor(private modalCtrl: ModalController, private bookingSvc: BookingsService) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  addNewBooking(f: NgForm){
    this.bookingSvc.insertBooking({
      'booking_name': f.value.booking_name,
      'topic': f.value.topic,
      'details': f.value.details,
      'booking_date': f.value.booking_date,
      'start_hour': f.value.start_hour,
      'end_hour': f.value.end_hour,
      'creator': f.value.creator,
    })
      .subscribe(
        () => {
          this.bookingSvc.fetchBookings()
            .subscribe((bookings) => {
              console.log(bookings);
            });
          console.log("INSERTED");
          this.closeModal();
        }
      );
  }

}
