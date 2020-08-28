import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface create_user_data {
  "email": String,
  "password": String,
  "role": String,
  "company": String
}

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(private http: HttpClient) { }

  createUser(email, password, company, role){
    return this.http.post<create_user_data>('http://localhost:5000/api/user/', {
      email: email,
      password: password,
      company: company,
      role: role
    })
  }
}
