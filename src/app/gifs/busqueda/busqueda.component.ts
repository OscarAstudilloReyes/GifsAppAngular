import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent   {

  //! aceptar null typescripts
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
  
  //llamando servicio
  constructor(private gifsService: GifsService){

  }
  
  
  buscar(){
     let valor = this.txtBuscar.nativeElement.value;
     if(valor.trim().length === 0){
       return;
     }
     console.log(valor);
   
     this.gifsService.buscarGifs(valor);

     this.txtBuscar.nativeElement.value = '';
  }
 
}
