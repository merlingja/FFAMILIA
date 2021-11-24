import { Component, OnInit } from '@angular/core';
import {ServiceAppQr} from '../../SERVICES/services-appqr/moduloappqr.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrls: ['./plantas.component.css']
})
export class PlantasComponent implements OnInit {
  Plantas:any = [];
  
   constructor(private serviceAppQr:ServiceAppQr, private router:Router) { }


  ngOnInit(): void {
    this.serviceAppQr.GetPlantass().subscribe(res => {
      console.log(res)
      this.Plantas =<any>res;
    });
    
  }

  

}
