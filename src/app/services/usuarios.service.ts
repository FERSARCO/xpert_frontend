import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { environment } from '../../environments/enviroment';


@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}
  menu: any[] = [];

  //Funcion para validar si el usuario tiene permisos para acceder a la ruta seleccionada
  // validateRuta(MENU: any) {
  //   const currentUrl = `${this.location.path()}/`
  //   let url = currentUrl.split("/")
  //   let urlFinal = `/${url[1]}/${url[2]}/`
  //   for (const key in MENU) {
  //     if (MENU[key].children) {
  //       //const urlExiste = MENU[key].children.some(submenu => submenu.link === urlFinal)
  //       // if (urlExiste) {
  //       //   return true
  //       // }
  //     }
  //   }
  //   return false
  // }

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

  //Funcion para registrar usuarios2
  //   crearUsuario(user: UsuarioModel) {
  //     this.token = localStorage.getItem('TOKEN')
  //     return this.http.post(`${environment.url}/usuarios/crear/?token=${this.token}`, {
  //       ...user,
  //       schemaBd: localStorage.getItem('SCHEMABD'),
  //       usuarioBd: localStorage.getItem('USUARIOBD'),
  //       passwordBd: localStorage.getItem('PASSWORDBD'),
  //     })
  //   }
}
