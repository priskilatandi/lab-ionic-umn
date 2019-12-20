import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  user: User;
  constructor(
    private authSvc : AuthService,
    private router : Router
  ) { }
  
  ngOnInit() {
    // this.authSvc.isAuthenticated.subscribe(resp => {
    //   if(resp) {
    //     console.log(resp);
    //     console.log('User is authenticated');
    //     this.router.navigateByUrl('/admin');
    //     // if(this.user.email == 'excellancafe25@gmail.com'){
    //     //   this.router.navigateByUrl('/admin');
    //     // } else {
    //     //   this.router.navigateByUrl('/home');
    //     // }
        
    //   } else {
    //     console.log('No user');
    //     this.router.navigateByUrl('/auth');
    //   }
    // });
  }
  
}
