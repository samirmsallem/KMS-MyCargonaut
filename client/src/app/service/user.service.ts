import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private localhostURL: string = "http://localhost:3000/";

    constructor(private http: HttpClient) {
    }

    registerUser(firstname: string, lastname: string, email: string, password: string, description: string) {
      return this.http.post(this.localhostURL + "api/users/createUser", {
        firstname: firstname,
        lastname: lastname,
        password: password,
        email: email,
        description: description
      }, httpOptions).toPromise()
        .then((res: any) => {
          console.log('user was created' + res);
        }).catch((err: any) => {
          console.log('user creation failed' + err);
        })
    }
    logIn(email: string, password: string) {
      this.http.post(this.localhostURL + "api/users/loginUser",
        {
          "email": email,
          "password": password,
        }, httpOptions)
        .toPromise()
        .then((res: any) => {
          console.log('login successful' + res);
        }).catch((err: any) => {
        console.log('login failed' + err);
      })
    }
  logOut() {
    this.http.get(this.localhostURL + "api/users/logoutUser",
       httpOptions)
      .toPromise()
      .then((res: any) => {
        console.log('logout successful' + res);
      }).catch((err: any) => {
      console.log('logout failed' + err);
    })
  }
}
