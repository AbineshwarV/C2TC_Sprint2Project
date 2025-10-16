import { Component, OnInit } from '@angular/core';
import { CollegeService } from './college.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  colleges: any[] = [];
  college: any = { autonomous: false };
  isEditing = false;

  constructor(private collegeService: CollegeService) {}

  ngOnInit(): void {
    this.loadColleges();
  }

  loadColleges(): void {
    this.collegeService.getAllColleges().subscribe(data => (this.colleges = data));
  }

  addOrUpdateCollege(): void {
    if (this.isEditing) {
      this.collegeService.updateCollege(this.college.id, this.college).subscribe(() => {
        this.loadColleges();
        this.cancelEdit();
      });
    } else {
      this.collegeService.addCollege(this.college).subscribe(() => {
        this.loadColleges();
        this.college = { autonomous: false };
      });
    }
  }

  editCollege(c: any): void {
    this.isEditing = true;
    this.college = { ...c }; 
    if (this.college.autonomous === undefined) this.college.autonomous = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.college = { autonomous: false };
  }

  deleteCollege(id: number): void {
    if (confirm('Delete this college?')) {
      this.collegeService.deleteCollege(id).subscribe(() => this.loadColleges());
    }
  }
}
