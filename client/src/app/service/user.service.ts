import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../../../server/src/users/user.model";

const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json'})
};

class userClass {

  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  description: string;
  coins: number;
  stars: number[];
  avStars: number;
  evaluations: string[];

  constructor(_id: string, firstname: string, lastname: string, email: string, password: string, description: string, coins: number, stars: number[], avStars: number, evaluations: string[]) {
    this._id = _id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.description = description;
    this.coins = coins;
    this.stars = stars;
    this.avStars = avStars;
    this.evaluations = evaluations;
  }
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  userArray: any[] = [];
  currentUser: any;
  vehicleArray: any[] = [];

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
      console.log("Login" + email + " " + password)
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
    console.log("Logout")
    this.http.get(this.localhostURL + "api/users/logoutUser",
       httpOptions)
      .toPromise()
      .then((res: any) => {
        console.log('logout successful' + res);
      }).catch((err: any) => {
      console.log('logout failed' + err);
    })
  }

  getAllUserData(): Promise<void> {
    return this.http.get("http://localhost:3000/api/users/getAll", httpOptions).toPromise()
      .then((res: any) => {
          for (let i = 0; i < res.usersArray.length; i++) {
            this.userArray.push(new userClass(res.usersArray[i]._id, res.usersArray[i].firstname, res.usersArray[i].lastname, res.usersArray[i].email, res.usersArray[i].password, res.usersArray[i].description, res.usersArray[i].coins, res.usersArray[i].stars, res.usersArray[i].avStars, res.usersArray[i].evaluations))
          }
      }).catch(() => {
        console.log('could not get list of users ');
      })
  };

  getUserData(): Promise<void> {
    return this.http.get("http://localhost:3000/api/users/getUser", httpOptions).toPromise()
      .then((res: any) => {
        this.currentUser = res.user;
      }).catch(() => {
        console.log('could not get user');
      })
  };

  updateUser(password: string, firstname: string, lastname: string, description: string) {
    return this.http.put(this.localhostURL + "api/users/updateUser", {
      firstname: firstname,
      lastname: lastname,
      password: password,
      description: description
    }, httpOptions).toPromise()
      .then((res: any) => {
        console.log('user was updated' + res);
      }).catch((err: any) => {
        console.log('user update failed' + err);
      })
  }

  getVehicles(): Promise<void> {
    return this.http.get("http://localhost:3000/api/users/getVehicles", httpOptions).toPromise()
      .then((res: any) => {
        for (let i = 0; i < res.vehicles.length; i++) {
          this.vehicleArray.push([res.vehicles[i]._id, res.vehicles[i].model, res.vehicles[i].space, res.vehicles[i].seats])
        }
      }).catch(() => {
        console.log('could not get list of users ');
      })
  };

  deleteVehicle(id: string): Promise<void> {
    console.log("Deleting in progress... " + id)
    return this.http.post("http://localhost:3000/api/users/deleteVehicle", {id}, httpOptions).toPromise()
      .then((res: any) => {
        this.vehicleArray = [];
        for (let i = 0; i < res.vehicles.length; i++) {
          this.vehicleArray.push(res.vehicles[i]._id, res.vehicles[i].model, res.vehicles[i].space, res.vehicles[i].seats)
        }
      }).catch(() => {
        console.log('could not get list of users ');
      })
  };

  addVehicle(model: string, space: number, seats: number) {
    return this.http.post(this.localhostURL + "api/users/addVehicle", {
      model: model,
      space: space,
      seats: seats
    }, httpOptions).toPromise()
      .then((res: any) => {
        console.log('vehicle was added' + res);
      }).catch((err: any) => {
        console.log('vehicle addition failed' + err);
      })
  }
}
