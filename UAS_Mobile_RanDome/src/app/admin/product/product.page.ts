import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { Product, ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  product: Product[];

  constructor(
    private productSvc: ProductService,
    private router: Router, 
    private authSvc: AuthService
  ) { }

  ngOnInit() {
    this.productSvc.getProducts().subscribe(res=> {
      this.product = res;
    });
  }

  remove(item) {
    this.productSvc.removeProduct(item.id);
  }

  onLogout() {
    this.authSvc.logout();
    this.router.navigateByUrl('/auth');
  }

}
