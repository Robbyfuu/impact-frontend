import { CollaboratorService, UiServiceService } from './../../services';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ICollaborator } from 'src/interfaces';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.page.html',
  styleUrls: ['./user-update.page.scss'],
})
export class UserUpdatePage implements OnInit {
  urlReturn = '/usersList';
  collaborator: ICollaborator = {};
  state = this.locationStrategy.getState();
  constructor(
    private collaboratorService: CollaboratorService,
    private route: Router,
    private uiService: UiServiceService,
    private activatedRoute: ActivatedRoute,
    private locationStrategy: LocationStrategy
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.collaboratorService
        .getCollaborator(params['id']!)
        .subscribe((response) => {
          this.collaborator = response.trabajador!;
        });
    });
  }

  async update(fUpdate: NgForm) {
    if (fUpdate.invalid) {
      return;
    }
    const updateValid = await this.collaboratorService.updateCollaborator(
      this.collaborator
    );
    if (updateValid) {
      this.uiService.presentToast('Registro actualizado');

      this.route.navigate(['/usersList']).then(() => {
        window.location.reload();
      });
    } else {
      this.uiService.presentToast('No se pudo actualizar');
    }
  }
}
