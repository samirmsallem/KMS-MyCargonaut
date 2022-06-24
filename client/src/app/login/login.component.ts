import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  showLogin = true;

  firstname = '';
  lastname = '';
  email = '';
  password = '';
  description = '';
  loginEmail = '';
  loginPassword = '';


  constructor(private userService: UserService, private _router: Router) {
    if(localStorage.getItem('authenticated') == 'true'){
      this._router.navigate(['dashboard'])
    }
  }

  ngOnInit(): void {
  }


  async logIn() {
    console.log(this.loginEmail, this.loginPassword)
    this.userService.logIn(this.loginEmail, this.loginPassword).then(res => {
      if(res){
        this._router.navigate(['dashboard'])
      }
      this.loginEmail = '';
      this.loginPassword = '';
    });
  }


  async registerUser() {
    this.userService.registerUser(this.firstname, this.lastname, this.email, this.password, this.description).then(async res => {
      if (res) {
        this.userService.logIn(this.email, this.password).then(res => {
          if (res) {
            this._router.navigate(['dashboard'])
          }
          this.firstname = '';
          this.lastname = '';
          this.email = '';
          this.password = '';
          this.description = '';
        });
      }
    })
  }

}

