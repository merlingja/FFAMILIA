import { Component, OnInit } from '@angular/core';
import {people} from '../../SERVICES/service_persona/personas.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  perso:any = [];

  constructor(private people: people) { }

  ngOnInit(): void {
    this.people.GetBooks().subscribe(res => {
      console.log(res)
      this.perso =<any>res;
    });

  }
}
