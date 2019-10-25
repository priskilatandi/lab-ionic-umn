import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Booking } from '../booking.model';
import { BookingService } from '../booking.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  // @ViewChild('f') form: NgForm;
  startDate: string;
  endDate: string;
  
  constructor(
    private modalCtrl:ModalController, 
    private loadingCtrl: LoadingController, 
    public actionSheetController: ActionSheetController, 
    private bookingSrvc: BookingService
  ) { }

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if(this.selectedMode === 'random'){
      this.startDate = new Date(
        availableFrom.getTime() + 
        Math.random() * (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - availableFrom.getTime())
      ).toISOString();

      this.endDate = new Date(
        new Date(this.startDate).getTime() + 
        Math.random() * 
          (new Date(this.startDate).getTime() + 
          6 * 24 * 60 * 60 * 1000 - 
          new Date(this.startDate).getTime())
      ).toISOString();
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    // this.modalCtrl.dismiss({message: 'This is a dummy message!'}, 'confirm');
    // this.isLoading = true;
    this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Booking the place ...',
    })
    .then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        loadingEl.dismiss();
        this.modalCtrl.dismiss({ message: 'booked!' },
        'confirm');
      }, 2000);
    })
    // if (!this.form.valid || !this.datesValid) {
    //   return;
    // }
    // this.modalCtrl.dismiss({ bookingData: {
    //   firstName: this.form.value['first_name'],
    //   lastName: this.form.value['last_name'],
    //   guestNumber: this.form.value['guest-name'],
    //   startDate: this.form.value['date-from'],
    //   endDate: this.form.value['date-to']
    // } }, 'confirm');
  }

  onBookMyPlace(){
    this.modalCtrl.dismiss({message: 'This is a dummy message!'}, 'confirm');
    this.bookingSrvc.addToMyBookings(this.selectedPlace);
  }

  // datesValid() {
  //   const startDate = new Date(this.form.value['date-from']);
  //   const endDate = new Date(this.form.value['date-to']);
  //   return endDate > startDate;
  // }
}
