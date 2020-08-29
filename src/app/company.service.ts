import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface create_company_data {
  name: String,
  address: String,
  customer_quantity: String
}
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanyInfo(company_name){
    return this.http.get(`http://localhost:5000/api/company/by_name/${company_name}`)
  }

  createCompany(name, address, customer_quantity){
    return this.http.post<create_company_data>(`http://localhost:5000/api/company/`, {
      name,
      address,
      customer_quantity
    })
  }
}
