import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, ResultadoBusquedaGIF, Images, The480_WStill } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root' //indica que el servicio es global
})
export class GifsService {
  private _apiKey:string = 'uKA0dsKyxCdWektEZaaLKeqGJ9jzQYlx'; 
  private _servicioUrl:string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultado:Gif[]=[]; //de tipo data de la interface

  get historial(){
    return [...this._historial];
  }

  /*
  Mostrar el historial de busqueda
  */
  constructor(private http:HttpClient){
    //si el arreglo historial viene vacio entonces retornara un arrelgo vacio[]
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultado = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(consulta:string){
    consulta = consulta.trim().toLocaleLowerCase();
    //validacion de duplicados
    if(!this._historial.includes(consulta)){
      this._historial.unshift(consulta);
      //solo se mostraran 10
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial',JSON.stringify(this._historial));
    }

    //refactorizacion de parametros
    const params = new HttpParams()
          .set('api_key',this._apiKey)
          .set('limit','20')
          .set('q',consulta);


    //peticion http
    //<tipo de resultado a retornar>
    this.http.get<ResultadoBusquedaGIF>(`${this._servicioUrl}/search?`,{ params })
      .subscribe(res =>{ //conocer el tipado
          this.resultado = res.data;
          console.log(this.resultado);
          localStorage.setItem('resultados',JSON.stringify(this.resultado));

      });



    console.log(this._historial);
  }
}
