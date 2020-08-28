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

  constructor(private comService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.user_state = JSON.parse(localStorage.getItem('user_state'))
    console.log(this.user_state);
    this.comService.getCompanyInfo(this.user_state.company).subscribe((data) =>{
      if(!data[0].message){
        console.log(data);
        this.company_state = data[0];
      }else{
        this.router.navigate(['/'])
      }
    })
  }

}
