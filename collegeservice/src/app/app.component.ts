import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CollegeService } from './college.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'college-module';

  constructor(private collegeService: CollegeService) {
    this.getCollegeDetails();
  }

  register(registerForm: NgForm) {
    this.collegeService.registerCollege(registerForm.value).subscribe(
      (resp: any) => {
        console.log(resp);
        registerForm.reset();
        this.getCollegeDetails();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getCollegeDetails() {
    this.collegeService.getColleges().subscribe(
      (resp) => {
        console.log(resp);
        this.collegeDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  collegeDetails = null as any;

  deleteCollege(college: any) {
    this.collegeService.deleteCollege(college.id).subscribe(
      (resp) => {
        console.log(resp);
        this.getCollegeDetails();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  collegeToUpdate = {
    id: null as any,
    name: '',
    location: '',
    email: '',
    phoneNumber: '',
    establishedYear: undefined,
    autonomous: false,
    affiliation: '',
    website: ''
  };

  edit(college: any) {
    this.collegeToUpdate = { ...college };
  }

  updateCollege() {
    this.collegeService.updateCollege(this.collegeToUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.getCollegeDetails();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
