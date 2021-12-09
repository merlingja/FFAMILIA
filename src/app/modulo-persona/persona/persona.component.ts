import { Component, OnInit } from '@angular/core';
import {ServicePeople} from '../../SERVICES/service_persona/personas.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder, AbstractControl, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import * as html2pdf from 'html2pdf.js'


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  download(){
    const element = document.getElementById('ListaPersona')
    ;

   var opt = {

   margin:       0.015,
   filename:     'registro de personas.pdf',
   image:        { type: 'jpeg', quality: 100 },
   html2canvas:  { scale: 10 },
   jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }



  };



  html2pdf().from(element).set(opt).save();
  }






 Perso:any = [];
 updateForm: FormGroup;
  titulo: string ='';
  createForm: FormGroup;
  submitted = false;

  constructor(private servicePeople:ServicePeople,
    private router:Router,
    private activatedRoute: ActivatedRoute,
     public formBuilder: FormBuilder) {
      this.updateForm = this.formBuilder.group({
        COD_PERSONA: '',
        DNI: ['', [Validators.required,Validators.minLength(4),
          Validators.maxLength(20)]],
        NOMBRES:['', [Validators.required,Validators.minLength(3),
          Validators.maxLength(100)]],
        APELLIDOS:['', [Validators.required,Validators.minLength(4),
          Validators.maxLength(100)]],
        EDAD: ['', [Validators.required,Validators.minLength(1),
          Validators.maxLength(100)]],
        SEXO: ['', [Validators.required,Validators.minLength(1),
          Validators.maxLength(100)]],
        ESTADOCIVIL:['', [Validators.required,Validators.minLength(1),
          Validators.maxLength(100)]],
        DIRECCION:['', [Validators.required,Validators.minLength(6),
          Validators.maxLength(100)]],
        TELEFONO:['', [Validators.required,Validators.minLength(6),
          Validators.maxLength(100)]],
        CORREO: ['', [Validators.required,Validators.minLength(4),
          Validators.maxLength(100)]],
        DESCRIPCION:  ['', [Validators.required,Validators.minLength(3),
          Validators.maxLength(100)]],
        FEC_INGRESO:''



        });

        this.createForm = this.formBuilder.group({
          DNI: ['', [Validators.required,Validators.minLength(4),
            Validators.maxLength(20)]],
          NOMBRES: ['', [Validators.required,Validators.minLength(3),
            Validators.maxLength(100)]],
          APELLIDOS: ['', [Validators.required,Validators.minLength(4),
            Validators.maxLength(100)]],
          EDAD: ['', [Validators.required,Validators.minLength(1),
            Validators.maxLength(100)]],
          SEXO: ['', [Validators.required,Validators.minLength(1),
            Validators.maxLength(100)]],
          ESTADOCIVIL: ['', [Validators.required,Validators.minLength(1),
            Validators.maxLength(100)]],
          DIRECCION:['', [Validators.required,Validators.minLength(6),
            Validators.maxLength(100)]],
          TELEFONO: ['', [Validators.required,Validators.minLength(6),
            Validators.maxLength(100)]],
          CORREO: ['', [Validators.required,Validators.minLength(4),
            Validators.maxLength(100)]],
          DESCRIPCION:['', [Validators.required,Validators.minLength(3),
            Validators.maxLength(100)]],
            FEC_INGRESO: ''
        });

      }


  ngOnInit(): void {
    this.ListarPersona();
      }


      get fu(): { [key: string]: AbstractControl } {
        return this.createForm.controls;
      }
      get f(): { [key: string]: AbstractControl } {
        return this.updateForm.controls;
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
        DNI: res['DNI'],
        NOMBRES: res['NOMBRES'],
        APELLIDOS: res['APELLIDOS'],
        EDAD: res['EDAD'],
        SEXO: res['SEXO'],
        ESTADOCIVIL: res['ESTADOCIVIL'],
        DIRECCION: res['DIRECCION'],
        TELEFONO: res['TELEFONO'],
        CORREO: res['CORREO'],
        DESCRIPCION: res['DESCRIPCION'],
        FEC_INGRESO: res['FEC_INGRESO']



      });
    });
  }

  onUpdate(): any {
    this.submitted = true;

if (this.updateForm.invalid) {
  return;
}
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

  nuevoPersona(): any {
    this.submitted = true;

    if (this.createForm.invalid) {
      return;
    }


    this.servicePeople.crearPersona( this.createForm.value).subscribe(() => {
      console.log('Data updated successfully!')
      Swal.fire('Se Inserto con exito',this.titulo,'success')
       this.ListarPersona();

    }, (err) => {
      console.log(err);
      Swal.fire('Ocurrio problema',this.titulo,'error')
  });
  }

  onReset(): void {
    this.submitted = false;
    this.createForm.reset();
  }



  eliminarPersona(id:any, i:number):any{
    if(window.confirm('Esta seguro de querer elimina el registro?')){
      this.servicePeople.borrarPersona(id).subscribe(res=>{
        if(res.affectedRows==1){
          console.log("Se elimino el registro");
          Swal.fire('Se elimino con exito',this.titulo,'success')

          this.Perso.splice(i, 1);
        }else{
          console.log("No se pudo eliminar el registro o, no existe");
          window.alert("error")
        }
      }, (err) => {
        console.log(err);

    });
    }
  }







}
