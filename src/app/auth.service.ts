import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface auth_data {
  "_id": String,
  "email": String,
  "role": String,
  "company": String,
  "authorized": boolean,
  "session": String
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean){
    this.loggedInStatus = value
  }

  get isLoggedIn(){
    return this.loggedInStatus
  }

  getUserDetails(email, password){
    return this.http.post<auth_data>('http://localhost:5000/api/session/auth', {
      email,
      password
    })
  }
}
