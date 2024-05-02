import {Component, EventEmitter, Input, OnInit, Output, inject} from '@angular/core';
import { DataService } from '../data.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.services';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit{
  @Input() StartDate: Date;
  @Input() EndDate: Date;
  @Output() NewShowMap = new EventEmitter<boolean>();
  private dataService = inject(DataService);
  private apiservice = inject(ApiService);
  public imgUrl = ["/assets/fakeroom.jpg", "/assets/fakeroom2.jpeg", "/assets/fakeroom3.jpg", "/assets/fakeroom4.jpg"]
  public message: number = null;
  public userForm = new FormGroup({
    fname: new FormControl("", [Validators.required]),
    lname: new FormControl("", [Validators.required]),
    phoneno: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),

  });

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe((message)=>{
      this.message = message;
    });
  }

  postdata(form) {  
    this.apiservice.registerBooking(form.value.fname,form.value.lname,form.value.phoneno,form.value.email,this.StartDate,this.EndDate,this.message);
    setTimeout(() => {
      this.userForm.reset();
      alert("Your booking has been submitted successfully!!")
      setTimeout(()=>{
        this.NewShowMap.emit(false);
      }, 3000)
    }, 2000)

  }


}