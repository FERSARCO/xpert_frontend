import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule,UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/usuarios.service';
import { HttpClientModule } from '@angular/common/http'; 



@Component({
  selector: 'app-login',
  standalone: true,
  imports:[RouterOutlet,FormsModule, ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  formLogin: any = UntypedFormGroup;
  @ViewChild("myinput")
  myinput!: ElementRef;
  cargando: boolean = false;
  validaUsuario: boolean = false;
  validaDatos: boolean = false;




  constructor(private fb: UntypedFormBuilder,  private renderer: Renderer2, private usuariosService: UsuariosService,private router: Router,) { }


  ngOnInit() {
    this.createForm()
  }


  //Crea el formulario de registro
  createForm() {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20),],],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),],],
    })
  }

  //METODOS DE VALIDACION DE CAMPOS LOGIN
  get usuarioInvalid() {
    return this.formLogin.get('username').invalid && this.formLogin.get('username').touched;
  }

  get passwordInvalid() {
    return this.formLogin.get('password').invalid && this.formLogin.get('password').touched;
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }

  login() {
    this.validaUsuario = false
    this.validaDatos = false

    //Metodo que valida las credenciales del usuario
    if (!this.formLogin.controls.username.value || !this.formLogin.controls.password.value) {
      this.validaDatos = true
      return;
    }

    this.cargando = true;

    this.usuariosService.login(this.formLogin.controls.username.value,this.formLogin.controls.password.value).subscribe({
      next:_=> {
        this.router.navigate(['/gatos']);
        this.cargando = false;
       },
      error: (error: any) => {
        if(error.status===400){
          this.validaUsuario=true
        }else{
          console.log(error)        
        }
        this.cargando=false
      }
    });
  }



}