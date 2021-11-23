import { Component, OnInit } from '@angular/core';
import {Servicepeople} from '../../SERVICES/service_persona/personas.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  perso:any = [];

  constructor(private servicepeople:Servicepeople, private router:Router) { }

  ngOnInit(): void {
    this.servicepeople.GetPersona().subscribe(res => {
      console.log(res)
      this.perso =<any>res;
    });

  }
}
