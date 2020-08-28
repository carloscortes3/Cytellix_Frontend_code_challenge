import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanyInfo(company_name){
    return this.http.get(`http://localhost:5000/api/company/by_name/${company_name}`)
  }
}
