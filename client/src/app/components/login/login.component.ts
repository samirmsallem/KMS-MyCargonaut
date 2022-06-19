import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  firstname = '';
  lastname = '';
  email = '';
  password = '';
  description = '';


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }


  logIn() {
    this.userService.logIn(this.email, this.password);
  }
  registerUser() {
    this.userService.Register()
  }

  }

