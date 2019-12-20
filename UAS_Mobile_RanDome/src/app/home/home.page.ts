import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private authSvc : AuthService,
    private router : Router
  ) { }
  
  ngOnInit() {
    // this.authSvc.isAuthenticated.subscribe(resp => {
    //   if(resp) {
    //     console.log(resp);
    //     console.log('User is authenticated');
    //     this.router.navigateByUrl('/home');
    //   } else {
    //     console.log('No user');
    //     this.router.navigateByUrl('/auth');
    //   }
    // });
  }

}
