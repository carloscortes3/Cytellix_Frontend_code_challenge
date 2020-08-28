import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface session_data {
  "_id": String,
  "email": String,
  "role": String,
  "company": String,
  "authorized": boolean,
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  isLoggedIn(session){
    return this.http.post<session_data>('http://localhost:5000/api/session/by_ses/', {
      session
    })
  }
}
