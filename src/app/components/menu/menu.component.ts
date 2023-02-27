import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { menuOpts } from 'src/app/data';
import { UiServiceService, UsuarioService } from 'src/app/services';
import { IMenuItem, IUsuario } from 'src/interfaces';

@Component({
  standalone: true,
  imports: [IonicModule, RouterModule, BrowserModule],
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  appPages: IMenuItem[] = [];

  usuario: IUsuario = {};
  isLogged = false;

  constructor(
    private usuarioService: UsuarioService,
    private uiServices: UiServiceService,

  ) {}

  async ngOnInit() {
    this.isLogged =  !(await this.usuarioService.loadToken());
    this.appPages = menuOpts;
  }
  onMenuOpen() {
    this.usuario = this.usuarioService.getUser();
  }
  logout() {
    this.isLogged = true;
    this.uiServices.presentToast('Sesion Cerrada');
    this.usuarioService.logout();
  }
}
