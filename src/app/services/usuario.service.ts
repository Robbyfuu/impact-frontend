import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from './../../environments/environment';
import { IResponseUser, IUsuario } from './../../interfaces';


const URL = environment.url;



@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  token: string = '';
  usuario: IUsuario = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  login(email: string, password: string) {
    const data = { email, password };
    return new Promise((resolve) => {
      this.http.post<IResponseUser>(`${URL}/auth/login`, data).subscribe(
        (response) => {
          if (response['ok'] === true) {
            this.saveToken(response['token'], response['usuario']!);
            resolve(true);
          }
        },
        (error: HttpErrorResponse) => {
          this.token = '';
          this.storage.clear();
          resolve(false);
        }
      );
    });
  }
  getUser () {
    return this.usuario;
  }

  async saveToken(token: string, usuario: IUsuario) {
    this.token = token;
    this.usuario = usuario;
    await this.storage.set('token', token);
    await this.storage.set('usuario', usuario);
  }

  async cargarToken() {
    this.token = (await this.storage.get('token')) || '';
  }
  async loadToken(): Promise<boolean> {
    await this.cargarToken();
    if (this.token.length === 0) {
      this.navCtrl.navigateRoot('/login', { animated: true });
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({
        'x-token': this.token,
      });
      this.http
        .get<IResponseUser>(`${URL}/auth/`, { headers })
        .subscribe((response) => {
          if (response['ok']) {
            this.usuario = response['usuario']!;
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login', { animated: true });
            resolve(false);
          }
        });
    });
  }
  register(usuario: IUsuario) {
    return new Promise<boolean>((resolve) => {
      this.http.post<IResponseUser>(`${URL}/usuarios`, usuario)
      .subscribe(
        (response) => {
          if (response['ok']) {
            this.saveToken(response['token'], response['usuario']!);
            resolve(true);
          }
        },
        (error: HttpErrorResponse) => {
          resolve(false);
        }
      );
    });
  }
  logout() {
    this.token   = '';
    this.usuario = {};
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }
}
