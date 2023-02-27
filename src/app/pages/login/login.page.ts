import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IonSlides, NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-servive.service';

import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal',{static:true}) slides!:IonSlides;
  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];
  
  avatarSlide ={
    slidesPerView: 3.5
  }
  loginUser = {
    email: '',
    password: ''
  }
  registerUser ={
    email: '',
    password: '',
    nombre: '',

  }
  constructor(private usuarioService:UsuarioService,
              private navCtrl: NavController  ,
              private uiService : UiServiceService       
    ) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }
  async login(fLogin:NgForm){
    if (fLogin.invalid) {return;}
   const valid = await this.usuarioService.login(this.loginUser.email,this.loginUser.password);

    if(valid){
      // navegar al tabs
      this.uiService.presentToast('Bienvenido');
      this.navCtrl.navigateRoot('/register', {animated: true}).then(()=>{
        window.location.reload();
      });
    }else{
      // mostrar alerta de usuario y contraseña no correcto
      this.uiService.alertaInformativa('Usuario y contraseña no son correctos');
    }
  }

  async register(fRegister:NgForm){
    if (fRegister.invalid) {return;}
    const registerValid = await this.usuarioService.register(this.registerUser);
    if(registerValid){
      // navegar al tabs
      this.navCtrl.navigateRoot('/register', {animated: true});
    }else{
      // mostrar alerta de usuario y contraseña no correcto
      this.uiService.alertaInformativa('El email ya existe');
    }
  }
  seleccionarAvatar(avatar:any){
    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;
  }
  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
