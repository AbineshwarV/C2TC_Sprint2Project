import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  API="http://localhost:8080/collegeservice";
  public registerCollege(collegeData: any)
  {
    return this.http.post(`${this.API}/collegeservice` , collegeData);
  }

  public getColleges(){
    return this.http.get(`${this.API}/collegeservice`);
  }

  public deleteCollege(collegeId:any){
    return this.http.delete(`${this.API}/collegeservice/${collegeId}`);
  }

  public updateCollege(college: any){
    return this.http.put(`${this.API}/collegeservice/${college.id}`, college);
  }
  constructor(private http: HttpClient) { }
}
