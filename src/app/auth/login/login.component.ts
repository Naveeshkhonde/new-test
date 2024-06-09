import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any= FormGroup;
  submitted:boolean = false;
  spinner:boolean= false;

  userType: any = [
    {name:'Admin', email: 'admin@gmail.com', password: '12345678', role: 'admin'},
    {name:'User', email: 'user@gmail.com', password: '12345678', role: 'user'},
  ]

  constructor(private fb: FormBuilder, private route : Router){  }

  ngOnInit(): void {
    this.loginForm =  this.fb.group({
      email: ["user@gmail.com",[Validators.required, Validators.email]],
      password:["12345678",[Validators.required, Validators.minLength(8)]]
    })
  }

  get loginControl(){
    return this.loginForm.controls
  }

  /* Login API */
  onSubmit(){
    this.spinner = true;
    this.submitted= true;
    if(this.loginForm.invalid){
      return;
    }   
    for (const item of this.userType) {
      if(item?.email === this.loginForm.value.email && item?.password === this.loginForm.value.password){
          console.log(item.role)
          localStorage.setItem("role", item.role)
          this.spinner = false;
          if(item?.role == 'user'){
            this.route.navigateByUrl('/movie/movie')
          }else{
            this.route.navigateByUrl('/movie')
          }
        }
    }
  }

}
