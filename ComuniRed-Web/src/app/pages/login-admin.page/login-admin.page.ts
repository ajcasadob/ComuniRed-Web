import { Component } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../dto/usuario.dto';

@Component({
  selector: 'app-login-admin.page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-admin.page.html',
  styleUrl: './login-admin.page.css',
})
export class LoginAdminPage {

  constructor(private servicioLogin: LoginService, private route: Router){}

  logiForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
  })

  loginUsuario(){
    const loginUsuario = new Usuario(
      this.logiForm.get('email')?.value!,
      this.logiForm.get('password')?.value!
    )

    this.servicioLogin.loginUsuario(loginUsuario).subscribe(resp =>{
      const token = resp.token;
      localStorage.setItem('token',token);
      if(resp.user.role != 'admin'){
        alert('No eres admnistrador')
      }else{
        this.route.navigate(['citas'])
      }
    }, error=>{
      alert('El correo no esta registrado')
    }
  )
    
  }
}
