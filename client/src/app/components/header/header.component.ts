import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  openNavigation = false;

  constructor(private userService: UserService) { }

  toggleNavigation() {
    this.openNavigation = !this.openNavigation;
  }

  logOut() {
    this.userService.logOut();
  }

  ngOnInit(): void {
  }

}
