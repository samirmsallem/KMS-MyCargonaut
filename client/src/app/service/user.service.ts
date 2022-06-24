import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

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

  private localhostURL: string = environment.backendUrl;

    constructor(private http: HttpClient) {
    }

    isLoggedIn() : boolean {
      return !localStorage.getItem('authenticated') === null;
    }

    registerUser(firstname: string, lastname: string, email: string, password: string, description: string): Promise<boolean> {
      return this.http.post(this.localhostURL + "/users/createUser", {
        firstname: firstname,
        lastname: lastname,
        password: password,
        email: email,
        description: description
      }, httpOptions).toPromise()
        .then((res: any) => {
          console.log('user was created' + res);
          return true;
        }).catch((err: any) => {
          console.log('user creation failed' + err);
          return false;
        })
    }
    async logIn(email: string, password: string): Promise<boolean> {
      console.log("Login" + email + " " + password)
      return this.http.post(this.localhostURL + "/users/loginUser",
        {
          "email": email,
          "password": password,
        }, httpOptions)
        .toPromise()
        .then((res: any) => {
          console.log('login successful' + res);
          localStorage.setItem('authenticated', 'true');
          return true;
        }).catch((err: any) => {
          console.log('login failed' + err);
          return false;
        })
    }
  logOut() {
    console.log("Logout")
    this.http.get(this.localhostURL + "/users/logoutUser",
       httpOptions)
      .toPromise()
      .then((res: any) => {
        console.log('logout successful' + res);
        localStorage.removeItem('authenticated');
      }).catch((err: any) => {
      console.log('logout failed' + err);
    })
  }

  getAllUserData(): Promise<void> {
    return this.http.get(this.localhostURL + "/users/getAll", httpOptions).toPromise()
      .then((res: any) => {
          for (let i = 0; i < res.usersArray.length; i++) {
            this.userArray.push(new userClass(res.usersArray[i]._id, res.usersArray[i].firstname, res.usersArray[i].lastname, res.usersArray[i].email, res.usersArray[i].password, res.usersArray[i].description, res.usersArray[i].coins, res.usersArray[i].stars, res.usersArray[i].avStars, res.usersArray[i].evaluations))
          }
      }).catch(() => {
        console.log('could not get list of users ');
      })
  };

  getUserData(): Promise<void> {
    return this.http.get(this.localhostURL + "/api/users/getUser", httpOptions).toPromise()
      .then((res: any) => {
        this.currentUser = res.user;
      }).catch(() => {
        console.log('could not get user');
      })
  };

  updateUser(password: string, firstname: string, lastname: string, description: string) {
    return this.http.put(this.localhostURL + "/users/updateUser", {
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
    return this.http.get(this.localhostURL + "/users/getVehicles", httpOptions).toPromise()
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
    return this.http.post(this.localhostURL + "/users/deleteVehicle", {id}, httpOptions).toPromise()
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
    return this.http.post(this.localhostURL + "/users/addVehicle", {
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
