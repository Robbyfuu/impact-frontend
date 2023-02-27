
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

import { ICollaborator, IResponseCollaborator } from 'src/interfaces';



const URL = environment.url;



@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  newCollaborator = new EventEmitter<ICollaborator>();

  constructor(
    private http : HttpClient,
    private usuarioService : UsuarioService
  ) { }

  createCollaborator (collaborator : ICollaborator){
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });
    return new Promise ( resolve => {
      this.http.post<IResponseCollaborator>(`${URL}/trabajador`, collaborator, {headers})
      .subscribe( response =>{
        this.newCollaborator.emit(response['trabajador']);
        resolve(true);
      })
    })
  }
  getCollaborators(){
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

      return this.http.get<IResponseCollaborator>(`${URL}/trabajador`, {headers})

  }
  getCollaborator(id : number){
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });
    return this.http.get<IResponseCollaborator>(`${URL}/trabajador/${id}`, {headers})
  }
  updateCollaborator(collaborator : ICollaborator){
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });
    return new Promise ( resolve => {
      this.http.put<IResponseCollaborator>(`${URL}/trabajador/${collaborator.id}`, collaborator, {headers})
      .subscribe( response =>{
        resolve(true);
      })
    })
  }
  deleteCollaborator(id : number){
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });
    return new Promise<boolean> ( resolve => {
      this.http.delete<IResponseCollaborator>(`${URL}/trabajador/${id}`, {headers})
      .subscribe( response =>{
        resolve(true);
      },(error: HttpErrorResponse )=> {
        resolve(false)
          
      });
    })
  }
}
