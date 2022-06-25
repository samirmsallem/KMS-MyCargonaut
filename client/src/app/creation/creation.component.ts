import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {

  constructor(private _router: Router) {
    if(localStorage.getItem('authenticated') === null){
      this._router.navigate([''])
    }
  }

  ngOnInit(): void {
  }

}
