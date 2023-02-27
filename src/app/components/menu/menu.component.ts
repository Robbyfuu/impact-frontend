import { Component, OnInit } from '@angular/core';
import {RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'
import { IonicModule } from '@ionic/angular';
import { UiServiceService, UsuarioService } from 'src/app/services';
import { IMenuItem, IUsuario } from 'src/interfaces';
import { menuOpts } from 'src/app/data';


@Component({
  standalone: true,
  imports: [IonicModule,RouterModule,BrowserModule],
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  appPages : IMenuItem[] = [];

  isLogged = false;

  constructor(private usuarioService : UsuarioService, private uiServices: UiServiceService) { }

  usuario : IUsuario = {};
   async ngOnInit() {
    this.isLogged = await this.usuarioService.loadToken();
    this.appPages = menuOpts;
  }
  onMenuOpen(){
    this.usuario =  this.usuarioService.getUser()
  }
  logout(){
    this.isLogged = false;
    this.uiServices.presentToast('Sesion Cerrada');
    this.usuarioService.logout();
  }

}
