import { Component, ElementRef,OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule,UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../services/usuarios.service';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports:[RouterOutlet,FormsModule, ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  formLogin: any = UntypedFormGroup;
  @ViewChild("myinput")
  myinput!: ElementRef;
  cargando: boolean = false;
  validaUsuario: boolean = false;
  validaDatos: boolean = false;
  usuarioCreado: boolean = false;


  constructor(private fb: UntypedFormBuilder,  private renderer: Renderer2, private usuariosService: UsuariosService,private router: Router,) { }


  ngOnInit() {
    this.createForm()
  }


  //Crea el formulario de registro
  createForm() {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20),],],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),],],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),],],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),],],
      age: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),],],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email,],],
  })
  }

  //METODOS DE VALIDACION DE CAMPOS LOGIN
  get usuarioInvalid() {
    return this.formLogin.get('username').invalid && this.formLogin.get('username').touched;
  }

  get passwordInvalid() {
    return this.formLogin.get('password').invalid && this.formLogin.get('password').touched;
  }

 goToLogin(){
  this.router.navigate(['/login']);
 }

  register() {
    this.validaUsuario = false
    this.validaDatos = false

    //Metodo que valida las credenciales del usuario
    if (!this.formLogin.controls.username.value || !this.formLogin.controls.password.value) {
      this.validaDatos = true
      return;
    }

    this.cargando = true;

    this.usuariosService.registrarUsuario(this.formLogin.value).subscribe({
      next:_=> {
        this.usuarioCreado=true

        this.cargando = false;
       },
      error: (error: any) => {
        this.usuarioCreado=false
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
