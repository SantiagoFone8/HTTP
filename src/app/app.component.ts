import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {usuario} from "./models/Usuario.interface"
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  usuarios:usuario[]=[];
  nuevoUsuario:usuario={nombre:"",email:"",empresa:""}

  constructor(private http: HttpClient){}

    ngOnInit(): void{
      this.obtenerUsuario();

    }
    obtenerUsuario(){
      this.http.get<any[]>("https://jsonplaceholder.typicode.com/users").subscribe(data=>{

        this.usuarios= data.map(user=> ({
          nombre:user.name,
          email:user.email,
          empresa:user.company.name

        }));

      }	);
    }
    agregarUsuario(){

      const body = {
        name:this.nuevoUsuario.nombre,
        email:this.nuevoUsuario.email,
        company:{
          name: this.nuevoUsuario.empresa
      }
    };

    this.http.post("https://jsonplaceholder.typicode.com/users",body).subscribe(Response=>{
      console.log("Usuario agregado",Response);
      this.usuarios.push(this.nuevoUsuario);
      this.nuevoUsuario={nombre:"",email:"", empresa:""};
    })
    }
  
}