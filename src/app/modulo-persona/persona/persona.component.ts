import { Component, OnInit } from '@angular/core';
import {ServicePeople} from '../../SERVICES/service_persona/personas.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
 Perso:any = [];
 updateForm: FormGroup;
  //createForm: FormGroup;
  titulo: string ='';

  constructor(private servicePeople:ServicePeople,
    private router:Router,
    private activatedRoute: ActivatedRoute,
     public formBuilder: FormBuilder) {
      this.updateForm = this.formBuilder.group({
        COD_PERSONA: '',
        ID: '',
        PRIMERNOMBRE:'',
        SEGUNDONOMBRE:'',
       PRIMERAPELLIDO:'',
        SEGUNDOAPELLIDO:'',
        SEXO:'',
        ESTADOCIVIL:'',
        EDAD:'',
        TIPO_CLIENTE:'',
        DESCRIPCION:'',
        USUARIO_ADD:''
        });
      }

      ngOnInit(): void {
        this.ListarPersona();
          }
      ListarPersona(){
        this.servicePeople.GetPersonaa().subscribe(res => {
          console.log(res)
          this.Perso =<any>res;
        });
      }

      EditarPersona(id:number){
        this.servicePeople.GetUnaPersona(id).subscribe(res => {
          console.log(res)
          this.updateForm.setValue({
            COD_PERSONA: id,
            ID: res['ID'],
            PRIMERNOMBRE: res['PRIMERNOMBRE'],
            SEGUNDONOMBRE: res['SEGUNDONOMBRE'],
            PRIMERAPELLIDO: res['PRIMERAPELLIDO'],
            SEGUNDOAPELLIDO: res['SEGUNDOAPELLIDO'],
            SEXO: res['SEXO'],
            ESTADOCIVIL: res['ESTADOCIVIL'],
            EDAD: res['EDAD'],
            TIPO_CLIENTE: res['TIPO_CLIENTE'],
            DESCRIPCION: res['DESCRIPCION'],
            USUARIO_ADD: res['USUARIO_ADD']


          });
        });
      }

      onUpdate(): any {
        this.servicePeople.updatePersona(this.updateForm.value)
        .subscribe(() => {
            console.log('Data updated successfully!')
            Swal.fire('Se actualizo con exito',this.titulo,'success')
            this.ListarPersona()


          }, (err) => {
            console.log(err);
            Swal.fire('Ocurrio problema',this.titulo,'error')
        });
      }

}
