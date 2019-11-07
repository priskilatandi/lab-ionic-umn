import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private http: HttpClient) { }

  fetchBookings(){
    return this.http.get('https://mobdevumn.com/api/fti_booking_app/get_bookings.php');
  }

  deleteBooking(id: string){
    return this.http.post('https://mobdevumn.com/api/fti_booking_app/delete_booking.php', {'booking_id': id}).pipe(take(1)
    );
  }

  insertBooking(newBooking: any){
    console.log(newBooking);
    const b = {
      'booking_name': newBooking.booking_name,
      'topic': newBooking.topic,
      'details': newBooking.details,
      'booking_date': newBooking.booking_date,
      'start_hour': newBooking.start_hour,
      'end_hour': newBooking.end_hour,
      'creator': newBooking.creator,
    };
    return this.http.post('https://mobdevumn.com/api/fti_booking_app/insert_booking.php', b).pipe(take(1));
  }
}
