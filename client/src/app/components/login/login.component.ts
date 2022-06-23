import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";

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


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }


  async logIn() {
    console.log(this.loginEmail, this.loginPassword)
    await this.userService.logIn(this.loginEmail, this.loginPassword);
    this.loginEmail = '';
    this.loginPassword = '';
  }


  async registerUser() {
    await this.userService.registerUser(this.firstname, this.lastname, this.email, this.password, this.description);
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.password = '';
    this.description = '';
  }

}

