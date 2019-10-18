import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: Place;

  constructor(
    private router: ActivatedRoute, 
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.router.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeId')){
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }

  // goBack(){
  //   // this.router.navigateByUrl('/places/tabs/discover');
  //   this.router.navigateBack('/places/tabs/discover');
  //   // this.navCtrl.pop();
  // }

  onBookPlace(){
    // this.router.navigateByUrl('/places/tabs/discover');
    // this.router.navigateBack('/places/tabs/discover');
    // this.navCtrl.pop();
    this.actionSheetController.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
    .then(actionSheetEl => {
      actionSheetEl.present();
    })
  }

  openBookingModal(mode: 'select' | 'random'){
    console.log(mode);
    this.modalCtrl
    .create({
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.place, selectedMode: mode }
    })
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData.data, resultData.role);
      if(resultData.role === 'confirm'){
        console.log('BOOKED');
      }
    });
  }

  // async BookPlace() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Book Place',
  //     buttons:[{
  //         text: 'Book w/ Random Date',
  //         handler: () => {
  //           this.modalCtrl.create({ component: CreateBookingComponent,
  //           componentProps: { selectedPlace: this.place }})
  //           .then(modalElement => {
  //             modalElement.present();
  //             return modalElement.onDidDismiss();
  //           })
  //           .then(resultData => {
  //             console.log(resultData);
  //           });
  //         }
  //       }, {
  //         text: 'Cancel',
  //         icon: 'close',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }

}
