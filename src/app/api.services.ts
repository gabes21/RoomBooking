import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})

export class ApiService {
    baseUrl:string = "localhost/RoomBooking/php";
    constructor(private httpClient : HttpClient) { }

    getData(): Observable<any>  {
        return this.httpClient.get('http://localhost/RoomBooking/php/filter.php');
    }

    filterRoom(sdate: string, edate: string): Observable<any> {
        return this.httpClient.post("http://localhost/RoomBooking/php/filter.php", { sdate, edate}, { responseType: 'json' });
      }

    public registerBooking(fname, lname, phoneno, email, sdate, edate, roomid) {
        console.log("Loading registerBooking")
        return this.httpClient.post("http://localhost/RoomBooking/php/submit.php", { fname, lname, phoneno, email, sdate, edate, roomid}, {responseType: 'text'}).subscribe((res)=>{
            console.log(res);
        })
    }
}