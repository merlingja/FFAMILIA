import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private readonly router: Router) {}
  
  ngOnInit(): void {}

  public entrar() {
    return this.router.navigate(['/panel']);
  }

}

