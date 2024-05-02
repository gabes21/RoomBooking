import { Component, inject } from '@angular/core';
import { MapViewComponent } from '../map-view/map-view.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { ApiService } from '../api.services';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-project1',
  standalone: true,
  imports: [MapViewComponent, UserFormComponent, ReactiveFormsModule],
  templateUrl: './project1.component.html',
  styleUrl: './project1.component.css'
})
export class Project1Component {
  private apiservice = inject(ApiService);
  filterResult = [];
  showMap: boolean = false;
  startDate: Date;
  endDate: Date; 
  public userFormFilter = new FormGroup({
    sdate: new FormControl("", [Validators.required]),
    edate: new FormControl("", [Validators.required]),

  });
 
  filterRoom(form) {
    this.startDate = new Date(form.value.sdate);
    this.endDate = new Date(form.value.edate);
    this.apiservice.filterRoom(form.value.sdate,form.value.edate).subscribe((data: any) => {
      this.filterResult = data;
      this.showMap = true;
      console.log("raw=", this.filterResult);
    });
  }

  public NotShowMap($event) {
    this.showMap = $event;
  }


}
