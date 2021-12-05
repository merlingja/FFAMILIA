import { Component, OnInit } from '@angular/core';
import {ServiceAppQr} from '../../SERVICES/services-appqr/moduloappqr.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-codigoqr',
  templateUrl: './codigoqr.component.html',
  styleUrls: ['./codigoqr.component.css']
})
export class CodigoQrComponent implements OnInit {
  Codigos:any = [];
  updateForm: FormGroup;
  createForm: FormGroup;
  titulo: string ='';

   constructor(
     private serviceAppQr:ServiceAppQr, 
     private router:Router,
     private activatedRoute: ActivatedRoute,
     public formBuilder: FormBuilder) {

      this.updateForm = this.formBuilder.group({
        cod_qr: '',
        seq_qr: '',
        usr_registro:''
       
  
        });

        this.createForm = this.formBuilder.group({
        sequencia: '',
        usuario: ''
        
        });
  

      }

   


      ngOnInit(): void {
        this.ListarCodigos();
          }
    
      ListarCodigos(){
        this.serviceAppQr.GetCodigoss().subscribe(res => {
          console.log(res)
          this.Codigos =<any>res;
        });
    
      }
      
      EditarCodigos(id:number){
        this.serviceAppQr.GetCodigoQR(id).subscribe(res => {
    
          console.log(res)
          this.updateForm.setValue({
            cod_qr: id,
            seq_qr: res['SEQ_QR'],
            usr_registro: res['USR_REGISTRO']
           
    
          });
        });
      }
    
      onUpdate(): any {
        this.serviceAppQr.updateCodigoss(this.updateForm.value)
        .subscribe(() => {
            console.log('Data updated successfully!')
            Swal.fire('Se actualizo con exito',this.titulo,'success')
            this.ListarCodigos()
            
          
          }, (err) => {
            console.log(err);
            Swal.fire('Ocurrio problema',this.titulo,'error')
        });
      }
  
      eliminarCodigos(id:any, i:number):any{
        if(window.confirm('Esta seguro de querer elimina el registro?')){
          this.serviceAppQr.borrarCodigoss(id).subscribe(res=>{
            if(res.affectedRows==1){
              console.log("Se elimino el registro");
              Swal.fire('Se elimino con exito',this.titulo,'success')
    
              this.Codigos.splice(i, 1);
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
      
      nuevoCodigo(): any {
        this.serviceAppQr.crearCodigoss( this.createForm.value).subscribe(() => {
            console.log('Data updated successfully!')
            Swal.fire('Se Inserto con exito',this.titulo,'success')
             this.ListarCodigos();
             
          }, (err) => {
            console.log(err);
            Swal.fire('Ocurrio problema',this.titulo,'error')
        });
      }
}