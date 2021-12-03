import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class logoComponent implements OnInit {

  constructor(private readonly router: Router) {}
  
  ngOnInit(): void {}

}

