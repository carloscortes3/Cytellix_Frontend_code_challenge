import { Component, OnInit } from '@angular/core';
import { CompanyService} from '../company.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user_state

  company_state

  comp_pre = ["Company Name: ", "Company Address: ", "Company Client Count: ", "Company User Count: "]
  output = ['','','','','']

  constructor(private comService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.comService.getUserInfo(localStorage.getItem('session')).subscribe((data) =>{
      this.user_state = data;
      this.comService.getCompanyInfo(this.user_state.company).subscribe((data) =>{
        if(!data[0].message){
          this.company_state = data[0];
          this.companyDisplay()
        }else{
          this.router.navigate(['/'])
        }
      })
    });

  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/'])
  }

  companyDisplay(){
    document.getElementById('four').style.display = "block"
    this.output[0] = this.comp_pre[0] + this.company_state.name
    this.output[1] = this.comp_pre[1] + this.company_state.address
    this.output[2] = this.comp_pre[2] + this.company_state.customer_quantity
    this.output[3] = this.comp_pre[3] + this.company_state.users_quantity
    this.output[4] = "Company Info"
    if (this.user_state.role === "Admin"){
      //document.getElementById('editBtn').style.display = "block"
      document.getElementById('bottomCard').style.display = "block"
    }else{
      //document.getElementById('editBtn').style.display = "none"
      document.getElementById('bottomCard').style.display = "none"
    }
  }

  userDisplay(){
    //document.getElementById('editBtn').style.display = "none"
    document.getElementById('four').style.display = "none"
    document.getElementById('bottomCard').style.display = "none"
    this.output[0] = "User email: " + this.user_state.email
    this.output[1] = "User company: " + this.user_state.company
    this.output[2] = "User role: " + this.user_state.role
    this.output[4] = "User Info"
  }

  addCompany(event){
    event.preventDefault()
    const target = event.target
    const name = target.querySelector('#c_name').value
    const address = target.querySelector('#c_address').value
    const count = Number(target.querySelector('#c_customers').value)
    this.comService.createCompany(name, address, count).subscribe((data)=>{
      if (!data[0].message){
        window.alert("You successfully added a new company to the database!!!")
        window.location.reload();
      }else{
        if (typeof(data[0].message)==="object"){
          window.alert("Please check your inputs and try again. The company you inputted may already exist")
        }
        else{
          window.alert(data[0].message)
        }
      }
    });
  }

}
