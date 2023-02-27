import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ICollaborator } from 'src/interfaces';

import { CollaboratorService, UiServiceService } from './../../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  collaborator: ICollaborator = {};

  constructor(
    private collaboratorService: CollaboratorService,
    private uiService: UiServiceService
  ) {}

  ngOnInit() {}

  async register(fRegister: NgForm) {
    if (fRegister.invalid) {
      return;
    }
    const createValid = await this.collaboratorService.createCollaborator(
      this.collaborator
    );

    if (createValid) {
      this.uiService.alertaInformativa('Usuario Creado Existosamente');
      this.collaborator = {
        nombre: '',
        email: '',
        apellido_paterno: '',
        apellido_materno: '',
        telefono: '',
      };
    } else {
      this.uiService.alertaInformativa('No se pudo crear el usuario');
    }
  }
}
