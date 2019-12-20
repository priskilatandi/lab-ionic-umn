import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { SignUpComponent } from './sign-up/sign-up.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private modalCtrl: ModalController, 
    private authSvc: AuthService, 
    private router: Router,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.authSvc.isAuthenticated.subscribe(resp => {
      if(resp) {
        console.log(resp);
        console.log('User is authenticated');
        this.router.navigateByUrl('/home');
      } else {
        console.log('No user');
      }
    });
  }

  async onLogin(f: NgForm) {

    const loading = await this.loadingController.create({
      message: 'Logging in...'
    });
    await loading.present();

    this.authSvc.login(f.value.email, f.value.pwd).subscribe(resp => {
      if (resp.idToken) {
        console.log(resp);
        if(f.value.email == 'priskila@gmail.com'){
          this.router.navigateByUrl('/admin').then(() => {
            loading.dismiss();
          });
        } else {
          this.authSvc.setUser(resp.localId);
          this.router.navigateByUrl('/home').then(() => {
            loading.dismiss();
          });
          loading.dismiss();
        }
      } else {
        console.log('login failed.');
        loading.dismiss();
      }
    },
    errorResp => {
      console.log(errorResp);
    });
    loading.dismiss();
    // this.router.navigateByUrl('/home');
  }

  async presentSignUpModal() {
    const modal = await this.modalCtrl.create({
      component: SignUpComponent
    });
    return await modal.present();
  }
}
