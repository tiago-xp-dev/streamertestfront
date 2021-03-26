import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  readonly rootURL = 'https://localhost:5001/api';

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getByCourseId(id) {
    return this.http.get(this.rootURL + '/Project/GetByCourse/'+ id);
  }

  getById(id) {
    return this.http.get(this.rootURL + '/Project/GetById/' + id);
  }

  postData(formData) {
    return this.http.post(this.rootURL + '/Project/Create', formData);
  }

  putData(formData) {
    return this.http.put(this.rootURL + '/Project/Update', formData);
  }
  deleteData(id) {
    return this.http.delete(this.rootURL + '/Project/Delete/' + id);
  }
}