import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string = environment.URL;
 
  constructor(private http: HttpClient) { }
  
  /* Get list API   */
  getMovie(): Observable<any>{
    return this.http.get(`${this.url}/movie`)
  }
  
  /* Add movies API */
  addMovie(data:any): Observable<any>{
    return this.http.post(`${this.url}/movie`,data)
  }

  /* Edit movies API */
  editMovie(data:any, id:string): Observable<any>{
    return this.http.patch(`${this.url}/movie/${id}`,data)
  }

  /* Delete Movie API */
  deleteMovie(id:string): Observable<any>{
    return this.http.delete(`${this.url}/movie/${id}`)
  }
}

