import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IUsuario } from 'src/interfaces';
import { UsuarioService } from './services';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Registro', url: '/register', icon: 'person-add' },
    { title: 'Lista de Usuarios', url: '/usersList', icon: 'list' },

  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private usuarioService : UsuarioService) {}

  usuario : IUsuario = {};
   ngOnInit() {
    
  }
  onMenuOpen(){
    this.usuario =  this.usuarioService.getUser()
  }
}
