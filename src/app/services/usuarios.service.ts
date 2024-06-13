import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { environment } from '../../environments/enviroment';


@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}




  //Funcion para validar el ingreso de usuarios
  login(username: string, password: string) {
    return this.http.get(`${environment.url}/login`, {
      params: {
        username,
        password,
      },
    });
  }

  //Funcion para registrar usuarios
  registrarUsuario(user: UsuarioModel) {
    return this.http.post(`${environment.url}/register`, {
    ...user
    });
    }

}
