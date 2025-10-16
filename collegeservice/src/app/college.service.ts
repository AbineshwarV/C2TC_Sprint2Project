import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  private baseUrl = 'http://localhost:8080/collegeservice';

  constructor(private http: HttpClient) {}

  getAllColleges(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getCollegeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addCollege(college: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, college);
  }

  updateCollege(id: number, college: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, college);
  }

  deleteCollege(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
