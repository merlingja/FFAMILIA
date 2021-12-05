import { Component, OnInit } from '@angular/core';
import {ServiceAppQr} from '../../SERVICES/services-appqr/moduloappqr.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrls: ['./plantas.component.css']
})
export class PlantasComponent implements OnInit {
  Plantas:any = [];
  updateForm: FormGroup;
  createForm: FormGroup;
  titulo: string ='';

   constructor(
     private serviceAppQr:ServiceAppQr, 
     private router:Router,
     private activatedRoute: ActivatedRoute,
     public formBuilder: FormBuilder) {

      this.updateForm = this.formBuilder.group({
        cod_planta: '',
        nom_planta: '',
        nom_cientifico:'',
        clase:'',
        familia:'',
        especie:'',
        des_planta: ''
  
        });

        this.createForm = this.formBuilder.group({
        nombre: '',
        nombre_cientifico: '',
        clases: '',
        familias: '',
        especies: '',
        descripcion:''
        });
  

      }


      ngOnInit(): void {
        this.ListarPlantas();
          }
    
      ListarPlantas(){
        this.serviceAppQr.GetPlantass().subscribe(res => {
          console.log(res)
          this.Plantas =<any>res;
        });
    
      }

      EditarPlantas(id:number){
        this.serviceAppQr.GetPlanta(id).subscribe(res => {
    
          console.log(res)
          this.updateForm.setValue({
            cod_planta: id,
            nom_planta: res['NOM_PLANTA'],
            nom_cientifico: res['NOM_CIENTIFICO'],
            clase: res['CLASE'],
            familia: res['FAMILIA'],
            especie: res['ESPECIE'],
            des_planta: res['DES_PLANTA']
    
    
          });
        });
      }
    
      onUpdate(): any {
        this.serviceAppQr.updatePlantass(this.updateForm.value)
        .subscribe(() => {
            console.log('Data updated successfully!')
            Swal.fire('Se actualizo con exito',this.titulo,'success')
            this.ListarPlantas()
            
          
          }, (err) => {
            console.log(err);
            Swal.fire('Ocurrio problema',this.titulo,'error')
        });
      }
      
      eliminarPlantas(id:any, i:number):any{
        if(window.confirm('Esta seguro de querer elimina el registro?')){
          this.serviceAppQr.borrarPlantass(id).subscribe(res=>{
            if(res.affectedRows==1){
              console.log("Se elimino el registro");
              Swal.fire('Se elimino con exito',this.titulo,'success')
    
              this.Plantas.splice(i, 1);
            }else{
              console.log("No se pudo eliminar el registro o, no existe");
              window.alert("error")
              
            }
          }, (err) => {
            console.log(err);
            Swal.fire('Ocurrio problema',this.titulo,'error')
        }
        
        );
        }
      }

      nuevaPlanta(): any {
        this.serviceAppQr.crearPlantass( this.createForm.value).subscribe(() => {
            console.log('Data updated successfully!')
            Swal.fire('Se Inserto con exito',this.titulo,'success')
             this.ListarPlantas();
             
          }, (err) => {
            console.log(err);
            Swal.fire('Ocurrio problema',this.titulo,'error')
        });
      }
}
