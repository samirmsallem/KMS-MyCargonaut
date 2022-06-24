import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  constructor(private userService: UserService, private _router: Router) {
    if (localStorage.getItem('authenticated') === null) {
      this._router.navigate([''])
    }
  }

  currentUser: any;
  email = '';
  password = '';
  firstname = '';
  lastname = '';
  description = '';
  vehicleArray: any;
  model = '';
  space = 0;
  seats = 0;


  ngOnInit(): void {
    this.userService.getUserData().then(()=> {
      this.currentUser = this.userService.currentUser;
      this.email = this.currentUser.email;
      this.password = this.currentUser.password;
      this.firstname = this.currentUser.firstname;
      this.lastname = this.currentUser.lastname;
      this.description = this.currentUser.description;
    }).then(()=> {
      this.userService.getVehicles().then(()=> {
        this.vehicleArray = this.userService.vehicleArray
        console.log(this.vehicleArray)
      })
    }).catch(() => {
      console.log("Error");
    })
  }

  updateUser(): void {
    this.userService.updateUser(this.password, this.firstname, this.lastname, this.description).then(()=> {
      console.log(this.password, this.firstname, this.lastname, this.description)
      console.log("Successfully updated user")
    }).catch(() => {
      console.log("Error");
    })
  }

  getVehicles(): void {
    this.userService.getVehicles().then(()=> {
      this.vehicleArray = this.userService.vehicleArray;
      console.log("Successfully got vehicles")
    }).catch(() => {
      console.log("Error");
    })
  }

  deleteVehicle(id: string) {
    console.log(id)
    this.userService.deleteVehicle(id).then(()=> {
      this.vehicleArray = this.userService.vehicleArray;
      console.log("Successfully deleted vehicle")
      window.location.reload();
    }).catch(() => {
      console.log("Error");
    })
  }

  addVehicle() {
    this.userService.addVehicle(this.model, this.space, this.seats).then(()=> {
      this.vehicleArray = this.userService.vehicleArray;
      console.log("Successfully added vehicle")
      window.location.reload();
    }).catch(() => {
      console.log("Error");
    })
  }

}
