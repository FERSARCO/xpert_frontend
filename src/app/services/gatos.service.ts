import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class GatosService {
  constructor(private http: HttpClient) {}
  menu: any[] = [];

  //Servicio consultar todas las razas
  getAllBreeds() {
    return this.http.get(`${environment.url}/breeds`, {});
  }

    //Servicio consultar las imagenes por raza
    getImagesByBreed(breed_id:any, limit:number) {
        return this.http.get(`${environment.url}/imagesbybreedid/${breed_id}?limit=${limit}`, {});
      }


}
