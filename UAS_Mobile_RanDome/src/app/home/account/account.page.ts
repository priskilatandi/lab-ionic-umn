import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Signup } from 'src/app/auth/signup.model';
import { User } from 'src/app/auth/user.model';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core'

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  private localID : any;
  signup: Signup = {
    id: null,
    email: null,
    firstname: null,
    lastname: null,
    gender: null
  };
  user: User[];
  selectedImage: string;
  constructor(
    private router: Router, 
    private authSvc: AuthService
  ) { }

  ngOnInit() {
    console.log("lalala");
    this.localID = this.authSvc.getUserID();
    console.log(this.authSvc.getUserID());
    this.authSvc.getUser(this.localID).subscribe( res => {
      this.signup.email = res.email;
      this.signup.firstname = res.firstname;
      this.signup.lastname = res.lastname;
      this.signup.gender = res.gender;
      console.log(this.signup);
    });
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Uri,
      correctOrientation: true
    });
    this.selectedImage = image.webPath;
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    } else {
      this.takePicture();
    }
  }

  onLogout() {
    this.authSvc.logout();
    this.router.navigateByUrl('/auth');
  }

}
