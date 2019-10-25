import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places= new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Gading Apartment',
      '2BR, Luas dan Cozy',
      'https://id1-cdn.pgimgs.com/listing/16148973/UPHO.88407740.V800/Apartemen-Scientia-Jl-Newton-Residence-Kelapa-Dua-Tangerang-Tangerang-Indonesia.jpg',
      100000000,
      new Date('2019-01-01'),
      new Date('2020-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      'Serpong Apartment',
      'Apartemen Romantis',
      'https://d3p0bla3numw14.cloudfront.net/news-content/img/2018/01/29125919/Serpong-Garden-Apartment.jpg',
      125000000,
      new Date('2019-01-01'),
      new Date('2020-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'BSD Apartment',
      'Apartemen Murah',
      'https://img.rea-asia.com/rumah123/800x1080-fit/apartment/ap19/1944803/original/aps1944803-apartemen-di-jual-di-bsd-city-tangerang-15671348211232.jpg',
      500000000,
      new Date('2019-01-01'),
      new Date('2020-12-31'),
      'abc'
    ),
  ]);

  get places(){
    return this._places.asObservable();
  }

  constructor(private authService: AuthService) { }

  getPlace(id: string){
    return this.places.pipe(
      take(1),
      map(places => {
        return {...places.find(p => p.id === id)};
      })
    );
  }

  addPlace(title: string, description: string, price: number, dateForm: Date, dateTo: Date) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://static3.businessinsider.com/image/5681799ce6183e55008b526d-480/carmel-place-nyc-micro-apartment.jpg',
      price, 
      dateForm,
      dateTo,
      this.authService.userId
    );

    this.places.pipe(take(1)).subscribe(places => {
      setTimeout(() => {
        this._places.next(places.concat(newPlace));
      }, 1000);
    });
  }
  
}
