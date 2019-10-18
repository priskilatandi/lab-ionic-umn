import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Booking } from '../booking.model';
import { BookingService } from '../booking.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
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
  }

  onBookMyPlace(){
    this.modalCtrl.dismiss({message: 'This is a dummy message!'}, 'confirm');
    this.bookingSrvc.addToMyBookings(this.selectedPlace);
  }
}
