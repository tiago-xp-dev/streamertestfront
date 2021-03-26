import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders }    from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  readonly rootURL = 'https://localhost:5001/api';

  constructor(private http: HttpClient) { }  
      httpOptions = {  
        headers: new HttpHeaders({  
          'Content-Type': 'application/json'  
        })  
      }    
      getAllCourses()
      {
        return this.http.get(this.rootURL + '/Course/GetAllCourses')
      }

      getData(id){  
        return this.http.get(this.rootURL + '/Course/GetById/'+id); 
      }  
      
      postData(formData){  
        return this.http.post(this.rootURL + '/Course/Create',formData);  
      }  
      
      putData(formData){  
        return this.http.put(this.rootURL + '/Course/Update',formData);  
      }  
      deleteData(id){  
        return this.http.delete(this.rootURL + '/Course/Delete/'+id);  
      }  
}