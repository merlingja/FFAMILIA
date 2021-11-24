import { Component, OnInit } from '@angular/core';
import {ServicePeople} from '../../SERVICES/service_persona/personas.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

 Perso:any = [];

  constructor(private servicePeople:ServicePeople, private router:Router) { }

  ngOnInit(): void {
    this.servicePeople.GetPersonaa().subscribe(res =>{
      console.log(res)
      this.Perso =<any>res;

    });

  }
}
