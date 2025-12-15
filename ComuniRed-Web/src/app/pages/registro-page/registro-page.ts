import { Component } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroUsuario } from '../../dto/registro.dto';

@Component({
  selector: 'app-registro-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registro-page.html',
  styleUrl: './registro-page.css',
})
export class RegistroPage {

  constructor(private servicioRegistro: LoginService, private route: Router){}

  registroForm = new FormGroup({
    nombre : new FormControl('',Validators.required),
    password : new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    confirmarPassword : new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    emailUsuario : new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
  })

  crearUsuario(){
      const nuevoUsuario = new RegistroUsuario(
        this.registroForm.get('nombre')?.value!,
        this.registroForm.get('emailUsuario')?.value!,
        this.registroForm.get('password')?.value!,
        this.registroForm.get('confirmarPassword')?.value!,
      )
      this.servicioRegistro.crearUsuario(nuevoUsuario).subscribe(resp =>{
        const token = resp.token;
        localStorage.setItem('token', token);
        this.route.navigate(['login'])
      },
    error=>{
      alert('El correo ya esta registrado')
    })
  }

}
