
import { Component, OnInit } from '@angular/core';
import {ServicePeople} from '../../SERVICES/service_persona/personas.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  download(){
    const element = document.getElementById('ListaEmpleado')
    ;

   var opt = {


   margin:       0.82,
   filename:     'registro de empleados.pdf',
   image:        { type: 'jpeg', quality: 100, src:'../assets/logo_full.png' },
   html2canvas:  { scale: 10 },
   jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }



  };



  html2pdf().from(element).set(opt).save();
  }


  Employee:any = [];
 updateForm: FormGroup;
  titulo: string ='';
  createForm: FormGroup;

  constructor(private servicePeople:ServicePeople,
    private router:Router,
    private activatedRoute: ActivatedRoute,
     public formBuilder: FormBuilder) {
      this.updateForm = this.formBuilder.group({
        COD_EMPLEADO: '',
        DNI: '',
        DESIGNACION:'',
        SUELDO:'',
       DIRECCION:'',
        CONTACTO:'',
        FEC_INICIO:'',
        FEC_INGRESO:'',
        APELLIDOS:'',
        NOMBRES:''
        });

        this.createForm = this.formBuilder.group({
          DNI: '',
          NOMBRES: '',
          APELLIDOS: '',
          DESIGNACION: '',
          SUELDO: '',
          DIRECCION:'',
         CONTACTO: '',
         FEC_INICIO:'',
        FEC_INGRESO:'',

        });





      }

      ngOnInit(): void {
        this.ListarEmpleado();
          }
      ListarEmpleado(){
        this.servicePeople.GetEmpleado().subscribe(res => {
          console.log(res)
          this.Employee =<any>res;
        });
      }

      EditarEmpleado(id:number){
        this.servicePeople.GetUnEmpleado(id).subscribe(res => {
          console.log(res)
          this.updateForm.setValue({
            COD_EMPLEADO: id,
            DNI: res['DNI'],
            DESIGNACION: res['DESIGNACION'],
            SUELDO: res['SUELDO'],
            DIRECCION: res['DIRECCION'],
            CONTACTO: res['CONTACTO'],
            FEC_INICIO: res['FEC_INICIO'],
            FEC_INGRESO: res['FEC_INGRESO'],
            APELLIDOS: res['APELLIDOS'],
            NOMBRES: res['NOMBRES']


          });
        });
      }

      onUpdate(): any {
        this.servicePeople.updateEmpleado(this.updateForm.value)
        .subscribe(() => {
            console.log('Data updated successfully!')
            Swal.fire('Se actualizo con exito',this.titulo,'success')
            this.ListarEmpleado()


          }, (err) => {
            console.log(err);
            Swal.fire('Ocurrio problema',this.titulo,'error')
        });
      }

      nuevoEmpleado(): any {
        this.servicePeople.crearEmpleado( this.createForm.value)
        .subscribe(() => {
            console.log('Data updated successfully!')
            Swal.fire('Se Inserto con exito',this.titulo,'success')
             this.ListarEmpleado();

          }, (err) => {
            console.log(err);
            Swal.fire('Ocurrio problema',this.titulo,'error')
        });
      }

      eliminarEmpleado(id:any, i:number):any{
        if(window.confirm('Esta seguro de querer elimina el registro?')){
          this.servicePeople.borrarEmpleado(id).subscribe(res=>{
            if(res.affectedRows==1){
              console.log("Se elimino el registro");
              Swal.fire('Se elimino con exito',this.titulo,'success')

              this.Employee.splice(i, 1);
            }else{
              console.log("No se pudo eliminar el registro o, no existe");
              window.alert("error")

            }
          }, (err) => {
             console.log(err);

             }

        )};
      }










}

