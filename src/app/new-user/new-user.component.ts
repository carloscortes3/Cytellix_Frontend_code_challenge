import { Component, OnInit } from '@angular/core';
import { CreateUserService } from '../create-user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  role = "Admin"

  constructor(private create_u: CreateUserService, private router: Router) { }

  ngOnInit(): void {
  }

  addUser(event){
    event.preventDefault()
    const target = event.target
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value
    const company = target.querySelector('#company').value
    this.create_u.createUser(email, password, company, this.role).subscribe((data)=>{
      if (!data[0].message){
        this.router.navigate(['/'])
        window.alert("You successfully created your account!")
      }else{
        window.alert(data[0].message)
      }
    });


  }

}
